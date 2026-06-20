from books.dto.book import CreateBookInput
from books.services.book import BookService
from books.models import Book


class CreateBookUseCase:
    def execute(self, **raw) -> Book:
        book_dto = CreateBookInput(**raw).validate()
        book = BookService.create_book(book_dto)
        return book
