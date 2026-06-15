from dataclasses import asdict, fields
from pyexpat import model
from rest_framework import serializers

from books.models import Book

class BookResponseSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    image = serializers.CharField(allow_null=True)

class CreateBookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    image = serializers.ImageField(required=False, allow_null=True)

class BookResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    image = serializers.CharField(allow_null=True)

class BookListResponseSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    results = BookResponseSerializer(many=True)

def book_output_to_dict(book_output) -> dict:
  return asdict(book_output)