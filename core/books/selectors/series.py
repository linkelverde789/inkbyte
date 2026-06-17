from books.models import BookSeries, BookSeriesMembership


class SeriesSelector:
    def get_series_by_id(series_id: int) -> BookSeries | None:
        return BookSeries.objects.filter(pk=series_id).first()

    def get_one_series_by_name(series_name: str) -> BookSeries | None:
        return BookSeries.objects.filter(name__icontains=series_name).first()

    def get_multiple_series_by_name(series_name: str):
        return BookSeries.objects.filter(name__icontains=series_name)

    def get_last_index_from_series(series: BookSeries) -> int:
        return (
            BookSeriesMembership.objects.filter(series=series)
            .order_by("-index")
            .first()
            .index
        )

    def list_series():
        return BookSeries.objects.order_by("name")
