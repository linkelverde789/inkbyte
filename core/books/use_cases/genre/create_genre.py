from core.books.dto.genre import CreateGenreInput
from core.books.models import Genre
from core.books.services.genre import create_genre


class CreateGenreUseCase:
    def execute(self, genre: CreateGenreInput) -> Genre:
        return create_genre(genre)
