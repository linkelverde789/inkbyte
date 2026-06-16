


from books.dto.author import CreateAuthorInput
from books.dto.book import AuthorOutput
from books.selectors.author import AuthorSelector
from books.services.author import create_author


class CreateAuthorUseCase:
    def execute(self, **raw) -> AuthorOutput:
        print("raw data: %s",  raw)
        author_dto = CreateAuthorInput(**raw).validate()
        author = create_author(author_dto)
        return AuthorSelector.author_to_output(author)