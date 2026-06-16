from dataclasses import asdict, fields
from rest_framework import serializers


class BookResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    image = serializers.SerializerMethodField()

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "title": instance.title,
            "description": instance.description,
            "image": self.get_image(instance),
        }

    def get_image(self, obj):
        request = self.context.get("request")

        if not request:
            return None

        if not obj.image:
            return None

        return request.build_absolute_uri(f"/media/{obj.image}")


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
