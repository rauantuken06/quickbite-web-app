from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Restaurant, Dish, Order, OrderItem, UserProfile, PaymentMethod, Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'address', 'is_default']


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'type', 'details', 'is_default']


class UserProfileSerializer(serializers.ModelSerializer):
    paymentMethods = PaymentMethodSerializer(source='user.payment_methods', many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['name', 'phone', 'paymentMethods']




class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    paymentMethods = PaymentMethodSerializer(source='payment_methods', many=True, read_only=True)
    name = serializers.CharField(source='profile.name', read_only=True)
    phone = serializers.CharField(source='profile.phone', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'phone', 'addresses', 'paymentMethods']

class RestaurantSerializer(serializers.ModelSerializer):
    dishesId = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True,
        source='dishes'
    )

    class Meta:
        model = Restaurant
        fields = [
            'id',
            'name',
            'cuisine',
            'category',
            'description',
            'image',
            'photos',
            'rating',
            'rating_num',
            'delivery_time',
            'address',
            'dishesId',
        ]


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = [
            'id',
            'name',
            'description',
            'price',
            'category',
            'cuisine',
            'restaurant',
            'images',
            'is_available',
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    dishId = serializers.IntegerField(source='dish.id', read_only=True)
    name = serializers.CharField(source='dish.name', read_only=True)
    price = serializers.FloatField(source='dish.price', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['dishId', 'name', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)
    restaurantName = serializers.CharField(source='restaurant.name', read_only=True)
    restaurantCuisine = serializers.CharField(source='restaurant.cuisine', read_only=True)
    date = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'date',
            'user',
            'restaurant',
            'restaurantName',
            'restaurantCuisine',
            'status',
            'items',
            'total',
            'delivery_address',
            'payment_method',
            'estimated_delivery',
        ]

