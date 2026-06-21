from books.dto.genre import CreateGenreInput
from books.models import Genre
from books.services.genre import GenreService


class CreateGenreUseCase:
    def execute(self, genre: CreateGenreInput) -> Genre:
        return GenreService.create_genre(genre)
