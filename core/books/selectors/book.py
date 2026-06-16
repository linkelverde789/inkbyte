from books.models import Book

class BookSelector():
    def get_book_by_id(book_id: int)-> Book | None:
        return Book.objects.filter(pk=book_id).first()

    def list_books():
        return Book.objects.order_by("-description")
