from core.books.selectors.series import SeriesSelector


class ListSeriesUseCase:
    def execute(self, page: int = 1, page_size: int = 12):
        return SeriesSelector().list_series().paginator(page=page, page_size=page_size)
