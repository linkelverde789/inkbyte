from books.dto.author import UpdateAuthorInput
from books.services.author import update_author
from books.models import Author


class UpdateAuthorUseCase:
    def execute(self, **raw) -> Author:
        author_dto = UpdateAuthorInput(**raw).validate()
        author = update_author(author_dto)
        return author
