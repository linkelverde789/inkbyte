from books.selectors.author import AuthorSelector
from books.models import Author


class ListAuthorUseCase:
    def execute(
        self, *, page: int = 1, page_size: int = 12
    ) -> tuple[list[Author], int]:
        return AuthorSelector.list_author().paginate(page, page_size)
