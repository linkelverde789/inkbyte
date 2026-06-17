from books.dto.genre import CreateGenreInput
from books.models import Genre
from books.services.genre import create_genre


class CreateGenreUseCase:
    def execute(self, genre: CreateGenreInput) -> Genre:
        return create_genre(genre)
