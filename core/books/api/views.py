from dataclasses import asdict

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from books.api.serializers import (
    BookListResponseSerializer,
    BookResponseSerializer,
    CreateBookSerializer,
    book_output_to_dict,
    
)
from books.exceptions import BookError
from books.use_cases.create_book import CreateBookUseCase
from books.use_cases.delete_book import DeleteBookUseCase
from books.use_cases.get_book import GetBookUseCase
from books.use_cases.list_books import ListBooksUseCase
from books.use_cases.update_book import UpdateBookUseCase


def _book_error_response(exc: BookError) -> Response:
    status_code = status.HTTP_404_NOT_FOUND if exc.code == "not_found" else status.HTTP_400_BAD_REQUEST
    return Response({"detail": exc.message, "code": exc.code}, status=status_code)


class BookReadPermissionMixin:
    """Public GET, other methos MUST be Authenticated."""

    def get_permissions(self):
        if self.request.method in ("GET", "HEAD", "OPTIONS"):
            return [AllowAny()]
        return [IsAuthenticated()]


class BookListCreateView(BookReadPermissionMixin, APIView):
    def get(self, request):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))

        items, total = ListBooksUseCase().execute(page=page, page_size=page_size)
        payload = {
            "count": total,
            "page": page,
            "page_size": page_size,
            "results": [asdict(item) for item in items],
        }
        return Response(BookListResponseSerializer(payload, context={"request": request}).data)

    def post(self, request):
        serializer = CreateBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            book_output = CreateBookUseCase().execute(**serializer.validated_data)
        except BookError as exc:
            return _book_error_response(exc)
        return Response(
            BookResponseSerializer(asdict(book_output)).data,
            status=status.HTTP_201_CREATED,
        )


class BookDetailView(BookReadPermissionMixin, APIView):

    def get(self, request, book_id: int):
        try:
            book_output = GetBookUseCase().execute(book_id)
        except BookError as exc:
            return _book_error_response(exc)
        return Response(BookResponseSerializer(asdict(book_output)).data)


    def patch(self, request, book_id: int):
        try:
            UpdateBookUseCase().execute(book_id, request)
        except BookError as exc:
            return _book_error_response(exc)
        
        return Response(status=status.HTTP_200_OK)


    def delete(self, request, book_id: int):
        try:
            DeleteBookUseCase().execute(book_id)
        except BookError as exc:
            return _book_error_response(exc)
        return Response(status=status.HTTP_204_NO_CONTENT)