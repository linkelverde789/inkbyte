from books.models import Author
from books.exceptions import AuthorError
from books.selectors.author import AuthorSelector


class GetAuthorUseCase:
    def execute(self, pk) -> Author | None:
        author = AuthorSelector().get_author_by_id(pk)

        if author is None:
            raise AuthorError("Author not found")

        return author
