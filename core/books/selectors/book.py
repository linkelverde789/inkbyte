from books.models import Book
from books.dto.book import BookFilters
from query_pipeline import QuerySetPipeline


class BookSelector:

    @staticmethod
    def get_book_by_id(book_id: int) -> Book | None:
        return Book.objects.filter(pk=book_id).first()

    @staticmethod
    def search_by_title(text: str):
        return QuerySetPipeline(Book.objects.filter(title__icontains=text))

    @staticmethod
    def get_book_by_title_exact(text: str) -> Book:
        return Book.objects.filter(title=text).first()

    @staticmethod
    def list_books():
        return QuerySetPipeline(Book.objects.all().order_by("id", "title"))

    @staticmethod
    def apply_filters(queryset, filters: BookFilters):
        if filters.q:
            queryset = queryset.filter(title__icontains=filters.q)

        if filters.author_id:
            queryset = queryset.filter(authors=filters.author_id)

        if filters.genre_id:
            queryset = queryset.filter(genres=filters.genre_id)

        return queryset
