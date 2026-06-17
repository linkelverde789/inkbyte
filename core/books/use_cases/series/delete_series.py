from core.books.models import Series, SeriesMembership
from core.books.selectors.series import SeriesSelector
from core.books.services.series import delete_series


class DeleteSeriesUseCase:
    def execute(self, series_id: int):
        return delete_series(SeriesSelector.get_series_by_id(series_id))
