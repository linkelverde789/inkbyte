from django.db import transaction
from books.dto.series import CreateSeriesInput, UpdateSeriesInput
from books.models import Book, BookSeries, BookSeriesMembership


@transaction.atomic
def create_series(data: CreateSeriesInput)-> BookSeries:
    return BookSeries.objects.create(
        name=data.name,
        description=data.description,
    )

#TODO: change types
def add_book_to_series(book: Book, series: BookSeries, index: int):
    BookSeriesMembership.objects.create(
        book=book,
        series=series,
        index=index
    )

def update_series(series: BookSeries, data: UpdateSeriesInput) -> BookSeries:
    if data.name is not None:
        series.name = data.name
    if data.description is not None:
        series.description = data.description
    series.save()
    return series

def delete_series(series: BookSeries)->None:
    series.delete()

def remove_book_from_series(book: Book, series: BookSeries) -> None:
    BookSeriesMembership.objects.filter(book=book, series=series).delete()


