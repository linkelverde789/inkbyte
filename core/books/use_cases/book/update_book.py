from books.dto.book import *
from books.services.book import update_book
from books.models import Book
from books.selectors.book import BookSelector


class UpdateBookUseCase:
    def execute(self, book_id: int, **raw) -> Book:
        book_dto = UpdateBookInput(**raw).validate()
        book = BookSelector.get_book_by_id(book_id)
        book = update_book(book=book, data=book_dto)
        return book
