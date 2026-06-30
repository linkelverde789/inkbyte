from django.db.models import Avg
from rest_framework import serializers

from books.models import Rating
from users.api.serializers import (
    BasicUserResponseSerializer,
)


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


class GenreResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class FileResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    file = serializers.FileField(required=False, allow_null=True)


class BookResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    image = serializers.ImageField()
    authors = AuthorResponseSerializer(many=True)
    genres = GenreResponseSerializer(many=True)
    files = FileResponseSerializer(many=True)
    series = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    def get_rating(self, obj):
        result = Rating.objects.filter(book=obj).aggregate(avg=Avg("rate"))
        return result["avg"] or 0

    def get_series(self, obj):
        memberships = obj.series_memberships.select_related("series").all()
        return SeriesInBookSerializer(memberships, many=True).data


class CreateBookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    description = serializers.CharField(allow_blank=True, required=False)
    image = serializers.ImageField(required=False, allow_null=True)

    series_id = serializers.IntegerField(required=False, allow_null=True)
    type_id = serializers.IntegerField(required=False, allow_null=True)

    author_ids = serializers.ListField(child=serializers.IntegerField(), required=False)

    genre_ids = serializers.ListField(child=serializers.IntegerField(), required=False)


class UpdateBookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200, required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    image = serializers.ImageField(required=False, allow_null=True)

    series_id = serializers.IntegerField(required=False, allow_null=True)
    type_id = serializers.IntegerField(required=False, allow_null=True)

    author_ids = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )

    genre_ids = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )


class BasicBookResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()


class SeriesInBookSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="series.id")
    name = serializers.CharField(source="series.name")
    description = serializers.CharField(source="series.description")
    index = serializers.IntegerField()


class RatingResponseSerializer(serializers.Serializer):
    user = BasicUserResponseSerializer()
    book = BasicBookResponseSerializer()
    rate = serializers.IntegerField(allow_null=True)


class BookStatsSerializer(serializers.Serializer):
    book = BookResponseSerializer()
    count = serializers.IntegerField()
