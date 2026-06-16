from books.dto.book import *
from books.services.book import create_book, delete_book
from books.selectors.book import *


class DeleteBookUseCase:
    def execute(self, book_id) -> None:
        book = BookSelector.get_book_by_id(book_id)
        return delete_book(book)