from books.dto.book import  CreateBookInput
from books.services.book import create_book
from books.models import Book


class CreateBookUseCase:
    def execute(self, **raw) -> Book:
        print("raw data: %s",  raw)
        book_dto = CreateBookInput(**raw).validate()
        book = create_book(book_dto)
        return book