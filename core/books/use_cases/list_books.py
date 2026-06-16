
from books.dto.book import BookOutput
from books.selectors.book import BookSelector


class ListBooksUseCase:
    def execute(self, *, page: int=1, page_size: int=12) -> tuple[list[BookOutput], int]:
        queryset = BookSelector.list_books()
        total = queryset.count()
        start = (page - 1) * page_size
        end = start + page_size
        page_queryset = queryset[start:end]
        items = [BookSelector.book_to_output(book) for book in page_queryset]
        return items, total