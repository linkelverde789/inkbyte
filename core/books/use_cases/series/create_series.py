from books.dto.series import CreateSeriesInput
from books.models import BookSeries
from books.services.series import create_series


class CreateSeriesUseCase:
    def execute(self, name: str, description: str | None=None) -> BookSeries:
        series_dto = CreateSeriesInput(name, description).validate()
        series = create_series(series_dto)
        return series
