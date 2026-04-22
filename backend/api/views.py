from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .models import Restaurant, Dish, Order, OrderItem, UserProfile, Address, PaymentMethod
from .serializers import UserSerializer, RestaurantSerializer, DishSerializer, OrderSerializer
from .consumers import user_group_name


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
            password=password,
            is_staff=False,
            is_superuser=False
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
        if self.request.user.is_staff:
            return Order.objects.all().select_related('user', 'restaurant').prefetch_related('items__dish').order_by('-created_at')
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

        # Broadcast updated global order count to the user's WebSocket group
        total_orders = Order.objects.count()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            user_group_name(request.user.id),
            {"type": "order_count_update", "total_orders": total_orders},
        )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
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


class AddressDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            address = Address.objects.get(pk=pk, user=request.user)
        except Address.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)
        address_text = request.data.get('address')
        if address_text is not None:
            address.address = address_text
        address.save()
        return Response({'id': address.id, 'address': address.address, 'is_default': address.is_default})


class UserMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        user = request.user
        email = request.data.get('email')
        if email is not None:
            user.email = email
            user.save()
        profile = user.profile
        name = request.data.get('name')
        phone = request.data.get('phone')
        if name is not None:
            profile.name = name
        if phone is not None:
            profile.phone = phone
        profile.save()
        return Response(UserSerializer(user).data)


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


class PaymentMethodDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            payment = PaymentMethod.objects.get(pk=pk, user=request.user)
        except PaymentMethod.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)
        type_ = request.data.get('type')
        details = request.data.get('details')
        is_default = request.data.get('is_default')
        if type_ is not None:
            payment.type = type_
        if details is not None:
            payment.details = details
        if is_default:
            PaymentMethod.objects.filter(user=request.user).update(is_default=False)
            payment.is_default = True
        payment.save()
        return Response({'id': payment.id, 'type': payment.type, 'details': payment.details, 'is_default': payment.is_default})


class AdminOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        qs = Order.objects.all().select_related('user', 'restaurant').prefetch_related('items__dish').order_by('-created_at')
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)
        return qs


class AdminOrderStatusUpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        valid_statuses = [choice[0] for choice in Order.status.field.choices]
        if not new_status or new_status not in valid_statuses:
            return Response({'error': f'Invalid status. Valid options: {valid_statuses}'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = new_status
        order.save()
        return Response(OrderSerializer(order).data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': 'refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logged out successfully'}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response({'error': 'Invalid or expired refresh token'}, status=status.HTTP_400_BAD_REQUEST)