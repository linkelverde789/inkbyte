from books.dto.genre import UpdateGenreInput
from books.models import Genre
from books.selectors.genre import GenreSelector
from books.services.genre import update_genre


class UpdateGenreUseClase:
    def execute(self, genre_id: int, **raw) -> Genre:
        genre = GenreSelector.get_genre_by_id(genre_id)
        genre_dto = UpdateGenreInput(**raw)
        genre = update_genre(genre=genre, data=genre_dto)
        return genre
