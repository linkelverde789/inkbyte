from books.selectors.series import SeriesSelector
from query_pipeline import QuerySetPipeline


class ListSeriesUseCase:
    def execute(self, page: int = 1, page_size: int = 12):
        queryset = QuerySetPipeline(SeriesSelector().list_series())
        return queryset.paginate(page=page, page_size=page_size)
