from books.dto.author import UpdateAuthorInput
from books.services.author import AuthorService
from books.models import Author
from books.selectors.author import AuthorSelector


class UpdateAuthorUseCase:
    def execute(self, author_id: int, **raw) -> Author:
        author_dto = UpdateAuthorInput(**raw).validate()
        author = AuthorSelector().get_author_by_id(author_id)
        author = AuthorService().update_author(author=author, data=author_dto)
        return author
