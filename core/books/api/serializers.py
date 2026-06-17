from dataclasses import asdict, fields
from rest_framework import serializers

from django.conf import settings


class AuthorResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    image = serializers.ImageField(required=False, allow_null=True)

class CreateAuthorSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(allow_blank=True, required=False)
    image = serializers.ImageField(required=False, allow_null=True)


class AuthorListResponseSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    results = AuthorResponseSerializer(many=True)

def author_output_to_dict(author_output) -> dict:
    return asdict(author_output)

class BookResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    image = serializers.ImageField(use_url = True)
    authors = AuthorResponseSerializer(many=True)


class CreateBookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    description = serializers.CharField(allow_blank=True, required=False)
    image = serializers.ImageField(required=False, allow_null=True)

    series_id = serializers.IntegerField(required=False, allow_null=True)
    type_id = serializers.IntegerField(required=False, allow_null=True)

    author_ids = serializers.ListField(child=serializers.IntegerField(), required=False)

    genre_ids = serializers.ListField(child=serializers.IntegerField(), required=False)


class BookListResponseSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    results = BookResponseSerializer(many=True)


def book_output_to_dict(book_output) -> dict:
    return asdict(book_output)