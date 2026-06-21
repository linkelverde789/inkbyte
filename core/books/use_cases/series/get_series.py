from books.exceptions import SeriesError
from books.models import Series
from books.selectors.series import SeriesSelector


class GetSeriesUseCase:
    def execute(self, series_id: int) -> Series | None:
        series = SeriesSelector().get_series_by_id(series_id=series_id)
        if series is None:
            raise SeriesError("Series not found")

        return series
