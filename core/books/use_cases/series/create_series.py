from books.dto.series import CreateSeriesInput
from books.models import Series
from books.services.series import SeriesService


class CreateSeriesUseCase:
    def execute(self, name: str, description: str | None = None) -> Series:
        series_dto = CreateSeriesInput(name, description).validate()
        series = SeriesService().create_series(data=series_dto)
        return series
