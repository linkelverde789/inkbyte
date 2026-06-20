from books.dto.author import CreateAuthorInput
from books.models import Author
from books.services.author import AuthorService


class CreateAuthorUseCase:
    def execute(
        self, name: str, description: str | None, image: object | None
    ) -> Author:
        author_dto = CreateAuthorInput(name, description, image).validate()
        author = AuthorService.create_author(author_dto)
        return author
