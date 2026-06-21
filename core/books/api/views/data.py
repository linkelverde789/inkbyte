from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from books.api.serializers.data import AuthorDataSerializer, GenreDataSerializer
from books.use_cases.genre.get_genres_for_data import GetGenreForDataUseCase
from books.use_cases.author.get_authors_for_data import GetAuthorForDataUseCase


class GenreDataView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        genres = GetGenreForDataUseCase().execute()
        serializer = GenreDataSerializer(genres, many=True)
        return Response({"results": serializer.data})


class AuthorDataView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        authors = GetAuthorForDataUseCase().execute()
        serializer = AuthorDataSerializer(authors, many=True)
        return Response({"results": serializer.data})
