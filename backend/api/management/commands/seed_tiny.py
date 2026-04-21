from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Restaurant, Dish, Order, OrderItem, UserProfile, Address

class Command(BaseCommand):
    help = "Seed tiny demo data: 1 restaurant, 1 dish, 1 user, 3 orders"
    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete existing tiny-seed records first")

    def handle(self, *args, **options):
        if options["reset"]:
            OrderItem.objects.filter(order__id__in=[9001, 9002, 9003]).delete()
            Order.objects.filter(id__in=[9001, 9002, 9003]).delete()
            Dish.objects.filter(id=901).delete()
            Restaurant.objects.filter(id=901).delete()
            UserProfile.objects.filter(user__username="tiny_user").delete()
            Address.objects.filter(user__username="tiny_user").delete()
            User.objects.filter(username="tiny_user").delete()
            self.stdout.write(self.style.WARNING("Tiny seed data reset done."))

        restaurant, _ = Restaurant.objects.update_or_create(
            id=901,
            defaults={
                "name": "Tiny Bistro",
                "cuisine": "italian",
                "category": "pizza",
                "description": "Small demo restaurant for testing",
                "image": "https://images.unsplash.com/photo-1722587539644-03164d2d327b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTU2NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
                "photos": [
                    "https://images.unsplash.com/photo-1722587539644-03164d2d327b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTU2NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
                    "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                    "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                    "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    ],
                "rating": 4.7,
                "rating_num": 12,
                "delivery_time": "20-30 min",
                "address": "42 Seed Street",
            },
        )

        dish, _ = Dish.objects.update_or_create(
            id=901,
            defaults={
                "name": "Tiny Margherita",
                "description": "Simple pizza for API testing",
                "price": 9.99,
                "category": "pizza",
                "cuisine": "italian",
                "restaurant": restaurant,
                "images": ["https://placehold.co/600x600?text=Tiny+Pizza"],
                "is_available": True,
            },
        )

        user, created = User.objects.get_or_create(
            username="tiny_user",
            defaults={"email": "tiny@example.com"},
        )
        if created:
            user.set_password("tiny12345")
            user.save()

        UserProfile.objects.update_or_create(
            user=user,
            defaults={
                "name": "Tiny User",
                "phone": "+1 555 000 0000",
                "delivery_address": "42 Seed Street, Apt 1",
            },
        )

        Address.objects.update_or_create(
            user=user,
            address="42 Seed Street, Apt 1",
            defaults={"is_default": True},
        )

        orders_data = [
            {
                "id": 9001,
                "status": "pending",
                "payment_method": "Card ****1111",
                "estimated_delivery": "30 minutes",
                "quantity": 1,
            },
            {
                "id": 9002,
                "status": "preparing",
                "payment_method": "Cash",
                "estimated_delivery": "15 minutes",
                "quantity": 2,
            },
            {
                "id": 9003,
                "status": "delivered",
                "payment_method": "Card ****2222",
                "estimated_delivery": "Delivered",
                "quantity": 3,
            },
        ]

        for row in orders_data:
            order, _ = Order.objects.update_or_create(
                id=row["id"],
                defaults={
                    "user": user,
                    "restaurant": restaurant,
                    "status": row["status"],
                    "delivery_address": "42 Seed Street, Apt 1",
                    "payment_method": row["payment_method"],
                    "estimated_delivery": row["estimated_delivery"],
                    "total": float(dish.price) * row["quantity"],
                },
            )
            order.items.all().delete()
            OrderItem.objects.create(order=order, dish=dish, quantity=row["quantity"])

        self.stdout.write(self.style.SUCCESS("Tiny seed inserted successfully."))
        self.stdout.write("Login user: tiny_user / tiny12345")