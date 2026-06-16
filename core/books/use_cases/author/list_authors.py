from books.dto.author import AuthorOutput
from books.selectors.author import AuthorSelector


class ListAuthorUseCase:
    def execute(
        self, *, page: int = 1, page_size: int = 12
    ) -> tuple[list[AuthorOutput], int]:
        queryset = AuthorSelector.list_author()
        total = queryset.count()
        start = (page - 1) * page_size
        page_queryset = queryset[start : start + page_size]
        items = [AuthorSelector.author_to_output(author) for author in page_queryset]
        return items, total
