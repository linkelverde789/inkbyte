from core.books.dto.series import UpdateSeriesInput


class UpdateSeriesUseCase:
    def execute(self, **raw):
        series_dto = UpdateSeriesInput(**raw).validate()
