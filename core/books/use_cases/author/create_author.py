


from books.dto.author import CreateAuthorInput
from books.selectors.author import AuthorSelector
from books.services.author import create_author
from books.models import Author


class CreateAuthorUseCase:
    def execute(self, name: str, description: str|None, image: object | None) -> Author:
        print(name, description, image)
        author_dto = CreateAuthorInput(name, description, image).validate()
        author = create_author(author_dto)
        return author