from django.urls import path
from .views import (
    AddPaymentMethodView,
    AddressDetailView,
    PaymentMethodDetailView,
    RegisterView,
    RestaurantListCreateView,
    RestaurantDetailView,
    DishListCreateView,
    DishDetailView,
    OrderListCreateView,
    OrderDetailView,
    AdminOrderListView,
    AdminOrderStatusUpdateView,
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
    path('admin/orders/', AdminOrderListView.as_view(), name='admin-orders'),
    path('admin/orders/<int:pk>/status/', AdminOrderStatusUpdateView.as_view(), name='admin-order-status'),

    path('addresses/', AddAddressView.as_view(), name='addresses'),
    path('addresses/<int:pk>/', AddressDetailView.as_view(), name='address-detail'),

    path('user/', UserMeView.as_view(), name='user-me'),
    path('payment-methods/', AddPaymentMethodView.as_view(), name='payment-methods'),
    path('payment-methods/<int:pk>/', PaymentMethodDetailView.as_view(), name='payment-method-detail'),

    path('logout/', LogoutView.as_view(), name='logout'),



]