from books.selectors.author import AuthorSelector
from books.models import Author
from query_pipeline import QuerySetPipeline


class ListAuthorUseCase:
    def execute(
        self, *, page: int = 1, page_size: int = 12
    ) -> tuple[list[Author], int]:
        queryset = QuerySetPipeline(AuthorSelector().list_author())

        return queryset.paginate(page=page, page_size=page_size)
