from books.services.genre import GenreService


class DeleteGenreUseCase:
    def execute(self, genre_id: int) -> None:
        return GenreService.delete_genre(genre_id)
