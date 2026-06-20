from django.db import transaction
from books.dto.series import CreateSeriesInput, UpdateSeriesInput
from books.models import Book, Series, SeriesMembership


class SeriesService:
    @transaction.atomic
    def create_series(self, data: CreateSeriesInput) -> Series:
        return Series.objects.create(
            name=data.name,
            description=data.description,
        )

    def update_series(self, series: Series, data: UpdateSeriesInput) -> Series:
        if data.name is not None:
            series.name = data.name
        if data.description is not None:
            series.description = data.description
        series.save()
        return series

    def delete_series(self, series: Series) -> None:
        self.delete_series_membership(series)
        series.delete()

    def delete_series_membership(self, series: Series) -> None:
        SeriesMembership.objects.filter(series=series).delete()

    def remove_book_from_series(self, book: Book, series: Series) -> None:
        SeriesMembership.objects.filter(book=book, series=series).delete()
