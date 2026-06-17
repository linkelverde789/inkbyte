from books.dto.series import UpdateSeriesInput
from books.selectors.series import SeriesSelector


class UpdateSeriesUseCase:
    def execute(self, series_id: int, **raw):
        series_dto = UpdateSeriesInput(**raw).validate()
        series = SeriesSelector.get_series_by_id(series_id)
        series = UpdateSeriesUseCase.execute(series=series, data=series_dto)
        return series
