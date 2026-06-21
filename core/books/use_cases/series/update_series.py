from books.dto.series import UpdateSeriesInput
from books.selectors.series import SeriesSelector
from books.services.series import SeriesService


class UpdateSeriesUseCase:
    def execute(self, series_id: int, **raw):
        series_dto = UpdateSeriesInput(**raw).validate()
        series = SeriesSelector().get_series_by_id(series_id)
        series = SeriesService().update_series(series=series, data=series_dto)
        return series
