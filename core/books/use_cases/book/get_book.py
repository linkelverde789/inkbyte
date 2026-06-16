from books.exceptions import BookError
from books.models import Book
from books.selectors.book import BookSelector


class GetBookUseCase:
    def execute(self,pk) -> Book | None:
        book = BookSelector.get_book_by_id(pk)

        if book is None:
            raise BookError("Book not found", "not_found")
        
        return Book