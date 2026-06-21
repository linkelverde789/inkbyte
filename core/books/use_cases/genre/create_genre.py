from books.dto.genre import CreateGenreInput
from books.models import Genre
from books.services.genre import GenreService


class CreateGenreUseCase:
    def execute(self, name: str) -> Genre:
        genre = CreateGenreInput(name=name)
        return GenreService().create_genre(genre=genre)
