from books.exceptions import SeriesError
from books.models import BookSeries


class GetSeriesUseCase:
    def execute(self, pk) -> BookSeries | None:
        series =  BookSeries.objects.filter(id=pk).first()
        if series is None:
            raise SeriesError("Series not found", "not_found")
        
        return series

