from rest_framework import serializers

from books.api.serializers.serializers import BookResponseSerializer
from users.api.serializers import UserResponseSerializer


class ListResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    cover = serializers.CharField(allow_null=True, allow_blank=True)
    books = BookResponseSerializer(many=True, required=False)
    user = UserResponseSerializer()


class CreateListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=200, allow_blank=True)
    cover = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class UpdateListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50, required=False)
    description = serializers.CharField(
        max_length=200, allow_blank=True, required=False
    )
    cover = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    book_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
