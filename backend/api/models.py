from django.db import models
from django.contrib.auth.models import User


class CategoryChoices(models.TextChoices):
    PIZZA = 'pizza', 'Pizza'
    BURGERS = 'burgers', 'Burgers'
    PASTA = 'pasta', 'Pasta'
    SALADS = 'salads', 'Salads'
    SIDES = 'sides', 'Sides'
    DRINKS = 'drinks', 'Drinks'
    DESSERTS = 'desserts', 'Desserts'
    SUSHI = 'sushi', 'Sushi'
    RAMEN = 'ramen', 'Ramen'
    TACOS = 'tacos', 'Tacos'
    STEAK = 'steak', 'Steak'


class CuisineChoices(models.TextChoices):
    ITALIAN = 'italian', 'Italian'
    JAPANESE = 'japanese', 'Japanese'
    AMERICAN = 'american', 'American'
    MEXICAN = 'mexican', 'Mexican'
    ASIAN = 'asian', 'Asian'
    STEAKHOUSE = 'steakhouse', 'Steakhouse'
    KOREAN = 'korean', 'Korean'
    KAZAKH = 'kazakh', 'Kazakh'


class OrderStatusChoices(models.TextChoices):
    PENDING = 'pending', 'Pending'
    PREPARING = 'preparing', 'Preparing'
    DELIVERED = 'delivered', 'Delivered'
    CANCELLED = 'cancelled', 'Cancelled'


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    cuisine = models.CharField(max_length=50, choices=CuisineChoices.choices)
    category = models.CharField(max_length=50, choices=CategoryChoices.choices)
    description = models.TextField(blank=True)
    image = models.CharField(max_length=500, blank=True)
    photos = models.JSONField(default=list, blank=True)
    rating = models.FloatField(default=0)
    rating_num = models.PositiveIntegerField(default=0)
    delivery_time = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Dish(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.FloatField()
    category = models.CharField(max_length=50, choices=CategoryChoices.choices)
    cuisine = models.CharField(max_length=50, choices=CuisineChoices.choices)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='dishes')
    images = models.JSONField(default=list, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.user.username


class PaymentMethod(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_methods')
    type = models.CharField(max_length=50)
    details = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} - {self.type}'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=50, choices=OrderStatusChoices.choices, default=OrderStatusChoices.PENDING)
    total = models.FloatField(default=0)
    payment_method = models.CharField(max_length=255, blank=True)
    estimated_delivery = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Order {self.id}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.dish.name} x {self.quantity}'
    
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    address = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} - {self.address}'