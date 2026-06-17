from books.dto.series import CreateSeriesInput
from books.models import Series
from books.services.series import create_series


class CreateSeriesUseCase:
    def execute(self, name: str, description: str | None = None) -> Series:
        series_dto = CreateSeriesInput(name, description).validate()
        series = create_series(series_dto)
        return series
