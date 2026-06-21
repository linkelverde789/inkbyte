from books.dto.book import UpdateBookInput
from books.models import Book
from books.selectors.book import BookSelector
from books.services.book import BookService


class UpdateBookUseCase:
    def execute(self, book_id: int, **raw) -> Book:
        book_dto = UpdateBookInput(**raw).validate()
        book = BookSelector().get_book_by_id(book_id)
        book = BookService().update_book(book=book, data=book_dto)
        return book
