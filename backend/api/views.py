from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Restaurant, Dish, Order, OrderItem, UserProfile, Address, PaymentMethod
from .serializers import UserSerializer, RestaurantSerializer, DishSerializer, OrderSerializer


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name', '')
        phone = request.data.get('phone', '')
        delivery_address = request.data.get('delivery_address', '')

        if not username or not password:
            return Response({'error': 'username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        UserProfile.objects.create(
            user=user,
            name=name,
            phone=phone,
            delivery_address=delivery_address
        )

        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class RestaurantListCreateView(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class RestaurantDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class DishListCreateView(generics.ListCreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer


class DishDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        restaurant_id = request.data.get('restaurant')
        items = request.data.get('items', [])
        delivery_address = request.data.get('delivery_address', '')
        payment_method = request.data.get('payment_method', '')
        estimated_delivery = request.data.get('estimated_delivery', '')

        if not restaurant_id:
            return Response({'error': 'restaurant is required'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=request.user,
            restaurant_id=restaurant_id,
            delivery_address=delivery_address,
            payment_method=payment_method,
            estimated_delivery=estimated_delivery,
            total=0
        )

        total = 0

        for item in items:
            dish_id = item.get('dishId')
            quantity = item.get('quantity', 1)

            if dish_id:
                dish = Dish.objects.get(id=dish_id)
                OrderItem.objects.create(
                    order=order,
                    dish=dish,
                    quantity=quantity
                )
                total += dish.price * quantity

        order.total = total
        order.save()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    

class AddAddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        address_text = request.data.get('address')

        if not address_text:
            return Response({'error': 'address required'}, status=400)

        is_first = not Address.objects.filter(user=request.user).exists()

        address = Address.objects.create(
            user=request.user,
            address=address_text,
            is_default=is_first
        )

        return Response({
            'id': address.id,
            'address': address.address,
            'is_default': address.is_default
        }, status=201)
    
class UserMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
    

class AddPaymentMethodView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        type_ = request.data.get('type')
        details = request.data.get('details')

        if not type_ or not details:
            return Response({'error': 'type and details are required'}, status=400)

        is_first = not PaymentMethod.objects.filter(user=request.user).exists()

        payment = PaymentMethod.objects.create(
            user=request.user,
            type=type_,
            details=details,
            is_default=is_first
        )

        return Response({
            'id': payment.id,
            'type': payment.type,
            'details': payment.details,
            'is_default': payment.is_default
        }, status=201)