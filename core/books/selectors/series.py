from books.models import Series, SeriesMembership
from query_pipeline import QuerySetPipeline


class SeriesSelector:
    def get_series_by_id(series_id: int) -> Series | None:
        return Series.objects.filter(pk=series_id).first()

    def get_one_series_by_name(series_name: str) -> Series | None:
        return Series.objects.filter(name__icontains=series_name).first()

    def get_multiple_series_by_name(series_name: str):
        return QuerySetPipeline(Series.objects.filter(name__icontains=series_name))

    def get_last_index_from_series(series: Series) -> int:
        return (
            SeriesMembership.objects.filter(series=series)
            .order_by("-index")
            .first()
            .index
        )

    def list_series():
        return QuerySetPipeline(Series.objects.order_by("name"))
