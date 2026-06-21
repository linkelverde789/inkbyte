from books.selectors.genre import GenreSelector


class GetGenreForDataUseCase:
    def execute(self):
        return GenreSelector().list_genres()
