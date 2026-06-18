from books.models import Book
from query_pipeline import QuerySetPipeline


class BookSelector:

    @staticmethod
    def get_book_by_id(book_id: int) -> Book | None:
        return Book.objects.filter(pk=book_id).first()

    @staticmethod
    def search_by_title(text: str):
        return QuerySetPipeline(Book.objects.filter(title__icontains=text))

    def get_book_by_title_exact(text: str) -> Book:
        return Book.objects.filter(title=text).first()

    @staticmethod
    def list_books():
        return QuerySetPipeline(Book.objects.all().order_by("-description", "title"))
