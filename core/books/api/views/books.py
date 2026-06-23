from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from books.api.serializers.serializers import (
    BookResponseSerializer,
    CreateBookSerializer,
    UpdateBookSerializer,
)
from books.exceptions import BookError
from books.api.permissions import PublicReadPrivateWriteMixin
from books.use_cases.book.create_book import CreateBookUseCase
from books.use_cases.book.delete_book import DeleteBookUseCase
from books.use_cases.book.get_book import GetBookUseCase
from books.use_cases.book.list_books import ListBooksUseCase
from books.use_cases.book.update_book import UpdateBookUseCase
from books.dto.book import BookFilters
from books.use_cases.book.get_books_from_series import GetBookFromSeriesUseCase
from books.use_cases.book.get_books_from_author import GetBookFromAuthorUseCase
from events.use_cases.create_event import CreateEventUseCase
from events.models import EventType


def _book_error_response(exc: BookError) -> Response:
    status_code = (
        status.HTTP_404_NOT_FOUND
        if exc.code == "not_found"
        else status.HTTP_400_BAD_REQUEST
    )
    return Response({"detail": exc.message, "code": exc.code}, status=status_code)


class BookListView(PublicReadPrivateWriteMixin, APIView):

    def get(self, request):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))
        q = str(request.query_params.get("q", ""))
        genre_id = request.query_params.get("genre_id")
        genre_id = int(genre_id) if genre_id is not None else None

        author_id = request.query_params.get("author_id")
        author_id = int(author_id) if author_id is not None else None

        filters_dto = BookFilters(q=q, genre_id=genre_id, author_id=author_id)

        items, total = ListBooksUseCase().execute(
            page=page, page_size=page_size, filters=filters_dto
        )

        is_search = bool(q or genre_id or author_id)

        metadata = {
            "path": request.path,
            "method": request.method,
        }

        if is_search:
            metadata["params"] = request.query_params
            CreateEventUseCase().execute(
                event_type=EventType.BOOK_SEARCH,
                user=request.user if request.user.is_authenticated else None,
                target=None,
                metadata=metadata,
            )
        else:
            CreateEventUseCase().execute(
                event_type=EventType.BOOK_LIST_VIEW,
                user=request.user if request.user.is_authenticated else None,
                target=None,
                metadata=metadata,
            )

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

        return Response(
            BookResponseSerializer(book_output, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class BooksFromSeriesView(PublicReadPrivateWriteMixin, APIView):

    def get(self, request, series_id: int):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))

        items, total = GetBookFromSeriesUseCase().execute(
            series_id=series_id, page=page, page_size=page_size
        )

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


class BooksFromAuthorView(PublicReadPrivateWriteMixin, APIView):
    def get(self, request, author_id: int):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))
        items, total = GetBookFromAuthorUseCase().execute(
            author_id=author_id, page=page, page_size=page_size
        )
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


class BookDetailView(PublicReadPrivateWriteMixin, APIView):
    def get(self, request, book_id: int):
        try:
            book_output = GetBookUseCase().execute(book_id)
        except BookError as exc:
            return _book_error_response(exc)

        CreateEventUseCase().execute(
            event_type=EventType.BOOK_VIEW,
            user=request.user if request.user.is_authenticated else None,
            target=book_output,
            metadata={
                "path": request.path,
                "method": request.method,
            },
        )

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
