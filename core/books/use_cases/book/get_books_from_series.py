from books.selectors.book import BookSelector
from books.models import Book


class GetBookFromSeriesUseCase:
    def execute(
        self, series_id: int, page_size: int = 12, page: int = 1
    ) -> tuple[list[Book], int]:
        queryset = BookSelector().list_books()
        queryset = queryset.filter(series__id=series_id)
        return queryset.paginate(page_size=page_size, page=page)
