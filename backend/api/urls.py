from django.urls import path
from .views import (
    AddPaymentMethodView,
    RegisterView,
    RestaurantListCreateView,
    RestaurantDetailView,
    DishListCreateView,
    DishDetailView,
    OrderListCreateView,
    OrderDetailView,
    AddAddressView,
    UserMeView,
    LogoutView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),

    path('restaurants/', RestaurantListCreateView.as_view(), name='restaurants'),
    path('restaurants/<int:pk>/', RestaurantDetailView.as_view(), name='restaurant-detail'),

    path('dishes/', DishListCreateView.as_view(), name='dishes'),
    path('dishes/<int:pk>/', DishDetailView.as_view(), name='dish-detail'),

    path('orders/', OrderListCreateView.as_view(), name='orders'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),

    path('addresses/', AddAddressView.as_view(), name='addresses'),

    path('user/', UserMeView.as_view(), name='user-me'),
    path('payment-methods/', AddPaymentMethodView.as_view(), name='payment-methods'),

    path('logout/', LogoutView.as_view(), name='logout'),



]