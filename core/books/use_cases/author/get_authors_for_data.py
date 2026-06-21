from books.selectors.genre import GenreSelector
from books.selectors.author import AuthorSelector


class GetAuthorForDataUseCase:
    def execute(self):
        return AuthorSelector().list_author().only("id", "name")
