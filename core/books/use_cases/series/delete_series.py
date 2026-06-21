from books.selectors.series import SeriesSelector
from books.services.series import SeriesService
from core.books.exceptions import SeriesError


class DeleteSeriesUseCase:
    def execute(self, series_id: int):
        series = SeriesSelector.get_series_by_id(series_id)
        if series is None:
            raise SeriesError("Series not found")
        return SeriesService.delete_series(series)
