from dataclasses import asdict, fields
from rest_framework import serializers

class BookResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    image = serializers.SerializerMethodField()
    genre = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.get("image"):
            return None
        
        return request.build_absolute_uri(f"/media/{obj['image']}")

class CreateBookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    image = serializers.ImageField(required=False, allow_null=True)

class BookListResponseSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    results = BookResponseSerializer(many=True)

def book_output_to_dict(book_output) -> dict:
  return asdict(book_output)
