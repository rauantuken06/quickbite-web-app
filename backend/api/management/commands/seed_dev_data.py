from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Restaurant, Dish, UserProfile, Address, PaymentMethod, Order, OrderItem

class Command(BaseCommand):
    help = "Seed backend DB with data equivalent to frontend dev_data."
    def add_arguments(self, parser):
        parser.add_argument("--with-orders", action="store_true", help="Also seed mock orders")
        parser.add_argument("--reset", action="store_true", help="Delete existing seeded records first")

def handle(self, *args, **options):
    with_orders = options["with_orders"]
    reset = options["reset"]

    if reset:
        OrderItem.objects.all().delete()
        Order.objects.all().delete()
        Dish.objects.all().delete()
        Restaurant.objects.all().delete()
        PaymentMethod.objects.all().delete()
        Address.objects.all().delete()
        UserProfile.objects.filter(user__username="alex").delete()
        User.objects.filter(username="alex").delete()
        self.stdout.write(self.style.WARNING("Existing seeded data removed."))

    restaurants_data = [
        {
            "id": 1,
            "name": "Bella Italia",
            "cuisine": "italian",
            "category": "pizza",
            "description": "Authentic Italian cuisine with fresh pasta and wood-fired pizzas",
            "image": "https://images.unsplash.com/photo-1722587539644-03164d2d327b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTU2NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
            "photos": [
                "https://images.unsplash.com/photo-1722587539644-03164d2d327b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTU2NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
                "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            ],
            "rating": 4.8,
            "delivery_time": "25-35 min",
            "address": ""
        },
        {
            "id": 2,
            "name": "American Diner",
            "cuisine": "american",
            "category": "burgers",
            "description": "Classic American burgers, fries, and comfort food",
            "image": "https://images.unsplash.com/photo-1728836485840-93054eef0f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGRpbmVyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "photos": [
                "https://images.unsplash.com/photo-1728836485840-93054eef0f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGRpbmVyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
                "https://images.unsplash.com/photo-1551782450-17144efb9c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            ],
            "rating": 4.6,
            "delivery_time": "20-30 min",
            "address": ""
        },
        {
            "id": 3,
            "name": "Tokyo Ramen House",
            "cuisine": "japanese",
            "category": "ramen",
            "description": "Traditional Japanese ramen, sushi, and authentic dishes",
            "image": "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "photos": [
                "https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
                "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1617093727343-374698b1b08d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            ],
            "rating": 4.9,
            "delivery_time": "30-40 min",
            "address": ""
        },
        {
            "id": 4,
            "name": "El Mariachi",
            "cuisine": "mexican",
            "category": "tacos",
            "description": "Vibrant Mexican flavors with fresh tacos and burritos",
            "image": "https://images.unsplash.com/photo-1732798068339-4a686b74589f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTY0NDIwNXww&ixlib=rb-4.1.0&q=80&w=1080",
            "photos": [
                "https://images.unsplash.com/photo-1732798068339-4a686b74589f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTY0NDIwNXww&ixlib=rb-4.1.0&q=80&w=1080",
                "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1582169296194-e4d644c48063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            ],
            "rating": 4.7,
            "delivery_time": "25-35 min",
            "address": ""
        },
        {
            "id": 5,
            "name": "Dragon Wok",
            "cuisine": "asian",
            "category": "salads",
            "description": "Pan-Asian cuisine with noodles, rice, and stir-fry dishes",
            "image": "https://images.unsplash.com/photo-1770552367015-d1261ab90879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBtb2Rlcm58ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
            "photos": [
                "https://images.unsplash.com/photo-1770552367015-d1261ab90879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBtb2Rlcm58ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1585032226651-759b368d7246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1563245372-f21724e3856d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            ],
            "rating": 4.5,
            "delivery_time": "30-40 min",
            "address": ""
        },
        {
            "id": 6,
            "name": "Prime Steakhouse",
            "cuisine": "steakhouse",
            "category": "steak",
            "description": "Premium cuts of meat and elegant dining experience",
            "image": "https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
            "photos": [
                "https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
                "https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            ],
            "rating": 4.8,
            "delivery_time": "35-45 min",
            "address": ""
        }
    ]

    dishes_data = [
        {"id": 1, "name": "Margherita Pizza", "description": "Classic pizza with fresh mozzarella, tomatoes, and basil", "price": 12.99, "category": "pizza", "cuisine": "italian", "restaurant_id": 1, "image": "https://images.unsplash.com/photo-1664309641932-0e03e0771b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBmb29kfGVufDF8fHx8MTc3NTU5OTIwN3ww&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 2, "name": "Pepperoni Pizza", "description": "Loaded with pepperoni and melted cheese", "price": 14.99, "category": "pizza", "cuisine": "italian", "restaurant_id": 1, "image": "https://images.unsplash.com/photo-1631347155591-c162abe23014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3NTYyMDA4OHww&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 5, "name": "Spaghetti Carbonara", "description": "Creamy pasta with bacon and parmesan cheese", "price": 13.99, "category": "pasta", "cuisine": "italian", "restaurant_id": 1, "image": "https://images.unsplash.com/photo-1574885014162-92e4f12928db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NzU1ODA0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 10, "name": "Tiramisu", "description": "Classic Italian dessert with coffee and mascarpone", "price": 7.99, "category": "desserts", "cuisine": "italian", "restaurant_id": 1, "image": "https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc1NTM3NDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 3, "name": "Classic Burger", "description": "Juicy beef patty with lettuce, tomato, and special sauce", "price": 10.99, "category": "burgers", "cuisine": "american", "restaurant_id": 2, "image": "https://images.unsplash.com/photo-1591336277932-f0579b75992b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2hlZXNlYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzU2NDM3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 8, "name": "French Fries", "description": "Crispy golden fries with sea salt", "price": 4.99, "category": "sides", "cuisine": "american", "restaurant_id": 2, "image": "https://images.unsplash.com/photo-1599211469310-9b0b50a2955a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNyaXNweXxlbnwxfHx8fDE3NzU1NjM5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 9, "name": "Chicken Wings", "description": "Crispy fried wings with your choice of sauce", "price": 9.99, "category": "sides", "cuisine": "american", "restaurant_id": 2, "image": "https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBmcmllZHxlbnwxfHx8fDE3NzU1NzM2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 7, "name": "Chocolate Cake", "description": "Rich and moist chocolate cake with ganache", "price": 6.99, "category": "desserts", "cuisine": "american", "restaurant_id": 2, "image": "https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzU1OTI5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 11, "name": "Sushi Rolls", "description": "Fresh salmon and tuna rolls with wasabi and ginger", "price": 15.99, "category": "sushi", "cuisine": "japanese", "restaurant_id": 3, "image": "https://images.unsplash.com/photo-1712183718471-dab51f0748ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJvbGxzJTIwamFwYW5lc2V8ZW58MXx8fHwxNzc1NTM4NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 12, "name": "Ramen Bowl", "description": "Rich tonkotsu broth with noodles, pork, and soft-boiled egg", "price": 14.99, "category": "ramen", "cuisine": "japanese", "restaurant_id": 3, "image": "https://images.unsplash.com/photo-1697701830191-c2b535e8ec51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMG5vb2RsZXMlMjBhc2lhbnxlbnwxfHx8fDE3NzU2MjkxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 13, "name": "Beef Tacos", "description": "Three soft tacos with seasoned beef, salsa, and guacamole", "price": 11.99, "category": "tacos", "cuisine": "mexican", "restaurant_id": 4, "image": "https://images.unsplash.com/photo-1707604341704-74abdc25e52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc3NTU1NzUwN3ww&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 4, "name": "Caesar Salad", "description": "Fresh romaine lettuce with parmesan and caesar dressing", "price": 8.99, "category": "salads", "cuisine": "asian", "restaurant_id": 5, "image": "https://images.unsplash.com/photo-1739436776460-35f309e3f887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc3NTU4NDUzNHww&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 14, "name": "Grilled Ribeye Steak", "description": "Premium 12oz ribeye with herb butter and vegetables", "price": 29.99, "category": "steak", "cuisine": "steakhouse", "restaurant_id": 6, "image": "https://images.unsplash.com/photo-1693422660544-014dd9f3ef73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGdyaWxsZWQlMjBtZWF0fGVufDF8fHx8MTc3NTY0NDIwOXww&ixlib=rb-4.1.0&q=80&w=1080"},
        {"id": 6, "name": "Coca Cola", "description": "Classic refreshing soda", "price": 2.99, "category": "drinks", "cuisine": "italian", "restaurant_id": 1, "image": "https://images.unsplash.com/photo-1770329374091-4c363812e69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NhJTIwY29sYSUyMGRyaW5rJTIwZ2xhc3N8ZW58MXx8fHwxNzc1NTYwODA4fDA&ixlib=rb-4.1.0&q=80&w=1080"}
    ]

    for r in restaurants_data:
        Restaurant.objects.update_or_create(
            id=r["id"],
            defaults={
                "name": r["name"],
                "cuisine": r["cuisine"],
                "category": r["category"],
                "description": r["description"],
                "image": r["image"],
                "photos": r["photos"],
                "rating": r["rating"],
                "delivery_time": r["delivery_time"],
                "address": r["address"],
                "rating_num": 0,
            },
        )

    for d in dishes_data:
        Dish.objects.update_or_create(
            id=d["id"],
            defaults={
                "name": d["name"],
                "description": d["description"],
                "price": d["price"],
                "category": d["category"],
                "cuisine": d["cuisine"],
                "restaurant_id": d["restaurant_id"],
                "images": [d["image"]],
                "is_available": True,
            },
        )

    user, created = User.objects.get_or_create(
        username="alex",
        defaults={"email": "alex.johnson@email.com"}
    )
    if created:
        user.set_password("alex12345")
        user.save()

    UserProfile.objects.update_or_create(
        user=user,
        defaults={
            "name": "Alex Johnson",
            "phone": "+1 (555) 123-4567",
            "delivery_address": "123 Main Street, Apt 4B, New York, NY 10001",
        },
    )

    Address.objects.update_or_create(
        user=user,
        address="123 Main Street, Apt 4B, New York, NY 10001",
        defaults={"is_default": True},
    )

    PaymentMethod.objects.update_or_create(
        user=user,
        type="Visa",
        details="**** **** **** 1234",
        defaults={"is_default": True},
    )
    PaymentMethod.objects.update_or_create(
        user=user,
        type="Mastercard",
        details="**** **** **** 5678",
        defaults={"is_default": False},
    )
    PaymentMethod.objects.update_or_create(
        user=user,
        type="PayPal",
        details="alex.johnson@email.com",
        defaults={"is_default": False},
    )

    if with_orders:
        sample_orders = [
            {
                "id": 1001,
                "status": "delivered",
                "restaurant_id": 1,
                "delivery_address": "123 Main Street, Apt 4B, New York, NY 10001",
                "payment_method": "Credit Card (****1234)",
                "estimated_delivery": "",
                "items": [
                    {"dish_id": 1, "quantity": 2},
                    {"dish_id": 6, "quantity": 2},
                ],
            },
            {
                "id": 1003,
                "status": "preparing",
                "restaurant_id": 1,
                "delivery_address": "123 Main Street, Apt 4B, New York, NY 10001",
                "payment_method": "Credit Card (****1234)",
                "estimated_delivery": "15-20 minutes",
                "items": [
                    {"dish_id": 5, "quantity": 1},
                    {"dish_id": 4, "quantity": 1},
                ],
            },
        ]

        for o in sample_orders:
            order, _ = Order.objects.update_or_create(
                id=o["id"],
                defaults={
                    "user": user,
                    "restaurant_id": o["restaurant_id"],
                    "status": o["status"],
                    "delivery_address": o["delivery_address"],
                    "payment_method": o["payment_method"],
                    "estimated_delivery": o["estimated_delivery"],
                    "total": 0,
                },
            )
            order.items.all().delete()
            total = 0
            for it in o["items"]:
                dish = Dish.objects.get(id=it["dish_id"])
                qty = it["quantity"]
                OrderItem.objects.create(order=order, dish=dish, quantity=qty)
                total += float(dish.price) * qty
            order.total = total
            order.save()

    self.stdout.write(self.style.SUCCESS("Dev data seeded successfully."))