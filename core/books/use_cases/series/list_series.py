from books.selectors.series import SeriesSelector


class ListSeriesUseCase:
    def execute(self, page: int = 1, page_size: int = 12):
        queryset = SeriesSelector().list_series()
        return queryset.paginate(page=page, page_size=page_size)
