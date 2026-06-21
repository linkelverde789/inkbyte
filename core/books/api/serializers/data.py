from rest_framework import serializers


class GenreDataSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class AuthorDataSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
