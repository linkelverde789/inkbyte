from books.selectors.author import AuthorSelector
from books.models import Author


class ListAuthorUseCase:
    def execute(
        self, *, page: int = 1, page_size: int = 12
    ) -> tuple[list[Author], int]:
        queryset = AuthorSelector.list_author()
        total = queryset.count()
        start = (page - 1) * page_size
        items = queryset[start : start + page_size]
        return items, total
