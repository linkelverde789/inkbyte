from books.selectors.genre import GenreSelector
from query_pipeline import QuerySetPipeline


class ListGenreUseCase:
    def execute(self, page: int = 1, page_size: int = 12):
        return QuerySetPipeline(GenreSelector().list_genres()).paginate(
            page=page, page_size=page_size
        )
