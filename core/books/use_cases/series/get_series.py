from books.exceptions import SeriesError
from books.models import BookSeries
from core.books.selectors.series import SeriesSelector


class GetSeriesUseCase:
    def execute(self, pk) -> BookSeries | None:
        series = SeriesSelector().get_series_by_id(pk)
        if series is None:
            raise SeriesError("Series not found", "not_found")

        return series
