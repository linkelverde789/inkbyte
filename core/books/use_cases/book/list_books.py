from books.selectors.book import BookSelector
from books.models import Book
from books.dto.book import BookFilters
from query_pipeline import QuerySetPipeline


class ListBooksUseCase:
    def execute(
        self, *, page: int = 1, page_size: int = 12, filters: BookFilters | None = None
    ) -> tuple[list[Book], int]:
        queryset = BookSelector().list_books()

        if filters:
            queryset = BookSelector().apply_filters(queryset=queryset, filters=filters)

        return QuerySetPipeline(queryset).paginate(page=page, page_size=page_size)
