from books.dto.book import *
from books.services.book import create_book
from books.models import Book


class UpdateBookUseCase:
    def execute(self, **raw) -> Book:
        book_dto = UpdateBookInput(**raw).validate()
        book = create_book(book_dto)
        return book