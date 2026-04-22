import json
from urllib.parse import parse_qs

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth.models import User

from .models import Order


def user_group_name(user_id: int) -> str:
    return f"orders_user_{user_id}"


class OrderCountConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        user = await self._authenticate()
        if user is None:
            await self.close(code=4001)
            return

        self.user = user
        self.group_name = user_group_name(user.id)

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        count = await self._get_order_count()
        await self.send(text_data=json.dumps({"total_orders": count}))

    async def disconnect(self, close_code):
        if hasattr(self, "group_name"):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def order_count_update(self, event):
        await self.send(text_data=json.dumps({"total_orders": event["total_orders"]}))

    async def _authenticate(self):
        query_string = self.scope.get("query_string", b"").decode()
        params = parse_qs(query_string)
        token_list = params.get("token", [])
        if not token_list:
            return None
        try:
            validated = AccessToken(token_list[0])
            user_id = validated["user_id"]
            return await database_sync_to_async(User.objects.get)(id=user_id)
        except (InvalidToken, TokenError, User.DoesNotExist):
            return None

    @database_sync_to_async
    def _get_order_count(self):
        return Order.objects.count()
