from books.dto.book import BookOutput
from books.models import Book

class BookSelector():
    def get_book_by_id(book_id: int)-> Book | None:
        return Book.objects.filter(pk=book_id).first()

    def list_books():
        return Book.objects.order_by("title")

    def book_to_output(book: Book)->BookOutput:
        image_url = book.image_url if book.image else None
        return BookOutput(
            id=book.id,
            title=book.title,
            description=book.description,
            image=image_url
        )