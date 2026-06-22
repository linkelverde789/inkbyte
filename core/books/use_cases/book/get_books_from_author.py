from books.selectors.book import BookSelector
from query_pipeline import QuerySetPipeline


class GetBookFromAuthorUseCase:
    def execute(self, author_id: int, page_size: int = 12, page: int = 1):
        queryset = BookSelector().list_books()
        queryset = QuerySetPipeline(queryset.filter(authors__id=author_id))
        return queryset.paginate(page_size=page_size, page=page)
