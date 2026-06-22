from books.selectors.book import BookSelector
from query_pipeline import QuerySetPipeline


class GetBooksFromGenreUseCase:
    def execute(self, genre_id: int, page: int = 1, page_size: int = 12):
        queryset = BookSelector().list_books()
        queryset = QuerySetPipeline(queryset.filter(genre_id=genre_id))
        return queryset.paginate(page=page, page_size=page_size)
