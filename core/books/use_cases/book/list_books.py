
from books.selectors.book import BookSelector
from books.models import Book


class ListBooksUseCase:
    def execute(self, *, page: int=1, page_size: int=12) -> tuple[list[Book], int]:
        queryset = BookSelector.list_books()
        total = queryset.count()
        start = (page - 1) * page_size
        end = start + page_size
        page_queryset = queryset[start:end]
        return page_queryset, total