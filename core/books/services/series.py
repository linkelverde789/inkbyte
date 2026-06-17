from django.db import transaction
from books.dto.series import CreateSeriesInput, UpdateSeriesInput
from books.models import Book, Series, SeriesMembership


@transaction.atomic
def create_series(data: CreateSeriesInput) -> Series:
    return Series.objects.create(
        name=data.name,
        description=data.description,
    )


def update_series(series: Series, data: UpdateSeriesInput) -> Series:
    if data.name is not None:
        series.name = data.name
    if data.description is not None:
        series.description = data.description
    series.save()
    return series


def delete_series(series: Series) -> None:
    delete_series_membership(series)
    series.delete()


def delete_series_membership(series: Series) -> None:
    SeriesMembership.objects.filter(series=series).delete()


def remove_book_from_series(book: Book, series: Series) -> None:
    SeriesMembership.objects.filter(book=book, series=series).delete()
