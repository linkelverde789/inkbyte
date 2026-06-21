from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from books.api.serializers.serializers import (
    AuthorListResponseSerializer,
    AuthorResponseSerializer,
    CreateAuthorSerializer,
)
from books.exceptions import AuthorError
from books.api.permissions import PublicReadPrivateWriteMixin
from books.use_cases.author.create_author import CreateAuthorUseCase
from books.use_cases.author.delete_author import DeleteAuthorUseCase
from books.use_cases.author.get_author import GetAuthorUseCase
from books.use_cases.author.list_authors import ListAuthorUseCase
from books.use_cases.author.update_author import UpdateAuthorUseCase


def _author_error_response(exc: AuthorError) -> Response:
    status_code = (
        status.HTTP_404_NOT_FOUND
        if exc.code == "not_found"
        else status.HTTP_400_BAD_REQUEST
    )
    return Response({"detail": exc.message, "code": exc.code}, status=status_code)


def _serialize_author(items, request):
    serializer = AuthorResponseSerializer(
        items,
        many=True,
        context={"request": request},
    )
    return serializer.data


class AuthorListCreateView(PublicReadPrivateWriteMixin, APIView):
    def get(self, request):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))

        items, total = ListAuthorUseCase().execute(page=page, page_size=page_size)

        payload = {
            "count": total,
            "page": page,
            "page_size": page_size,
            "results": _serialize_author(items, request),
        }
        serializer = AuthorListResponseSerializer(payload, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = CreateAuthorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            author_output = CreateAuthorUseCase().execute(**serializer.validated_data)
        except AuthorError as exc:
            return _author_error_response(exc)

        return Response(
            _serialize_author(author_output, request),
            status=status.HTTP_201_CREATED,
        )


class AuthorDetailView(PublicReadPrivateWriteMixin, APIView):

    def get(self, request, author_id: int):
        try:
            author_output = GetAuthorUseCase().execute(author_id)
        except AuthorError as exc:
            return _author_error_response(exc)

        return Response(_serialize_author(author_output, request))

    def patch(self, request, author_id: int):
        try:
            serializer = CreateAuthorSerializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)

            author_output = UpdateAuthorUseCase().execute(
                author_id, **serializer.validated_data
            )

        except AuthorError as exc:
            return _author_error_response(exc)

        return Response(
            _serialize_author(author_output, request), status=status.HTTP_200_OK
        )

    def delete(self, request, author_id: int):
        try:
            DeleteAuthorUseCase().execute(author_id)
        except AuthorError as exc:
            return _author_error_response(exc)

        return Response(status=status.HTTP_204_NO_CONTENT)
