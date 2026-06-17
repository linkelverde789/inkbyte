from books.exceptions import GenreError
from books.models import Genre
from books.selectors.genre import GenreSelector


class GetGenreUseCAse:
    def execute(self, genre_id: int) -> Genre | None:
        genre = GenreSelector.get_genre_by_id(genre_id)
        if genre is None:
            raise GenreError("Genre not found", "not_found")

        return genre
