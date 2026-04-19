from django.contrib import admin
from .models import Restaurant, Dish, Order, OrderItem, UserProfile, PaymentMethod, Address


admin.site.register(Restaurant)
admin.site.register(Dish)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(UserProfile)
admin.site.register(Address)
admin.site.register(PaymentMethod)

# Register your models here.
