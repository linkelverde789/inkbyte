from books.dto.author import UpdateAuthorInput
from books.dto.author import AuthorOutput
from books.selectors.author import AuthorSelector
from books.services.author import create_author


class UpdateAuthorUseCase:
    def execute(self, **raw) -> AuthorOutput:
        author_dto = UpdateAuthorInput(**raw).validate()
        author = create_author(author_dto)
        return AuthorSelector.author_to_output(author)
