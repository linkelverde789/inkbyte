from books.services.genre import GenreService
from books.exceptions import GenreError
from books.selectors.genre import GenreSelector


class DeleteGenreUseCase:
    def execute(self, genre_id: int) -> None:
        genre = GenreSelector().get_genre_by_id(genre_id=genre_id)
        if genre is None:
            raise GenreError("Genre not found")
        return GenreService().delete_genre(genre=genre)
