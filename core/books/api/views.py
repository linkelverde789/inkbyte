from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from books.api.serializers import (
    AuthorListResponseSerializer,
    AuthorResponseSerializer,
    BookResponseSerializer,
    CreateAuthorSerializer,
    CreateBookSerializer,
    UpdateBookSerializer,
)
from books.exceptions import AuthorError, BookError
from books.api.permissions import PublicReadPrivateWriteMixin
from books.use_cases.author.create_author import CreateAuthorUseCase
from books.use_cases.author.delete_author import DeleteAuthorUseCase
from books.use_cases.author.get_author import GetAuthorUseCase
from books.use_cases.author.list_authors import ListAuthorUseCase
from books.use_cases.author.update_author import UpdateAuthorUseCase
from books.use_cases.book.create_book import CreateBookUseCase
from books.use_cases.book.delete_book import DeleteBookUseCase
from books.use_cases.book.get_book import GetBookUseCase
from books.use_cases.book.list_books import ListBooksUseCase
from books.use_cases.book.update_book import UpdateBookUseCase


def _book_error_response(exc: BookError) -> Response:
    status_code = (
        status.HTTP_404_NOT_FOUND
        if exc.code == "not_found"
        else status.HTTP_400_BAD_REQUEST
    )
    return Response({"detail": exc.message, "code": exc.code}, status=status_code)


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


class BookListCreateView(PublicReadPrivateWriteMixin, APIView):

    def get(self, request):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))

        items, total = ListBooksUseCase().execute(page=page, page_size=page_size)

        return Response(
            {
                "count": total,
                "page": page,
                "page_size": page_size,
                "results": BookResponseSerializer(
                    items, many=True, context={"request": request}
                ).data,
            }
        )

    def post(self, request):
        serializer = CreateBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            book_output = CreateBookUseCase().execute(**serializer.validated_data)
        except BookError as exc:
            return _book_error_response(exc)

        return Response()


class BookDetailView(PublicReadPrivateWriteMixin, APIView):

    def get(self, request, book_id: int):
        try:
            book_output = GetBookUseCase().execute(book_id)
        except BookError as exc:
            return _book_error_response(exc)

        return Response(
            BookResponseSerializer(book_output, context={"request": request}).data
        )

    def patch(self, request, book_id: int):
        try:
            serializer = UpdateBookSerializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)

            book_output = UpdateBookUseCase().execute(
                book_id=book_id, **serializer.validated_data
            )

        except BookError as exc:
            return _book_error_response(exc)

        return Response(
            BookResponseSerializer(book_output, context={"request": request}).data
        )

    def delete(self, request, book_id: int):
        try:
            DeleteBookUseCase().execute(book_id)
        except BookError as exc:
            return _book_error_response(exc)

        return Response(status=status.HTTP_204_NO_CONTENT)


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
            return _book_error_response(exc)

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
