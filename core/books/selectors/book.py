from books.models import Book
from query_pipeline import QuerySetPipeline


class BookSelector:

    @staticmethod
    def get_book_by_id(book_id: int) -> Book | None:
        return QuerySetPipeline(Book.objects.filter(pk=book_id))

    @staticmethod
    def search_by_text(text: str):
        return QuerySetPipeline(
            Book.objects.filter(title__icontains=text)
        )

    @staticmethod
    def list_books():
        return QuerySetPipeline(
            Book.objects.all().order_by("-description")
        )