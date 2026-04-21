from django.urls import re_path
from .consumers import OrderCountConsumer

websocket_urlpatterns = [
    re_path(r"^ws/orders/$", OrderCountConsumer.as_asgi()),
]
