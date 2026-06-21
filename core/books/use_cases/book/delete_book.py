from books.dto.book import *
from books.services.book import BookService
from books.selectors.book import *


class DeleteBookUseCase:
    def execute(self, book_id: int) -> None:
        book = BookSelector.get_book_by_id(book_id)
        if book is None:
            raise BookError("Book not found")
        return BookService.delete_book(book)
