from books.selectors.book import BookSelector
from books.models import Book


class ListBooksUseCase:
    def execute(self, *, page: int = 1, page_size: int = 12) -> tuple[list[Book], int]:
        return BookSelector().list_books().paginate(page=page, page_size=page_size)
