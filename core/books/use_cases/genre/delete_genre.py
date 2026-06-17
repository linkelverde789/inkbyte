from core.books.services.genre import delete_genre


class DeleteGenreUseCase:
    def execute(self, genre_id: int) -> None:
        return delete_genre(genre_id)
