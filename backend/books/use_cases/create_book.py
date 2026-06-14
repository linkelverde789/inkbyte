from books.dto.book import *
from books.services.book import create_book
from books.selectors.book import BookSelector


class CreateBookUseCase:
    def execute(self, **raw) -> BookOutput:
        book_dto = CreateBookInput(**raw).validate()
        book = create_book(book_dto)
        return BookSelector.book_to_output(book)