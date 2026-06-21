from books.selectors.author import AuthorSelector
from books.services.author import AuthorService


class DeleteAuthorUseCase:
    def execute(self, author_id) -> None:
        author = AuthorSelector().get_author_by_id(author_id)
        return AuthorService().delete_author(author)
