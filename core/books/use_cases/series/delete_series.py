from books.selectors.series import SeriesSelector
from books.services.series import SeriesService


class DeleteSeriesUseCase:
    def execute(self, series_id: int):
        series = SeriesSelector.get_series_by_id(series_id)
        return SeriesService.delete_series(series)
