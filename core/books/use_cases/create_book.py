from books.dto.book import BookOutput, CreateBookInput
from books.selectors.book import BookSelector
from books.services.book import create_book


class CreateBookUseCase:
    def execute(self, **raw) -> BookOutput:
        print("raw data: %s",  raw)
        book_dto = CreateBookInput(**raw).validate()
        book = create_book(book_dto)
        return BookSelector.book_to_output(book)