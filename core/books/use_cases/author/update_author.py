from books.dto.author import UpdateAuthorInput
from books.services.author import create_author
from books.models import Author


class UpdateAuthorUseCase:
    def execute(self, **raw) -> Author:
        author_dto = UpdateAuthorInput(**raw).validate()
        author = create_author(author_dto)
        return author
