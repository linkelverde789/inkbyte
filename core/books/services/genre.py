from django.db import transaction
from books.dto.genre import CreateGenreInput, UpdateGenreInput
from books.models import Book, Genre


@transaction.atomic
def create_genre(genre: CreateGenreInput) -> Genre:
    return Genre.objects.create(name=genre.name)


def update_genre(genre: Genre, data: UpdateGenreInput) -> Genre:
    genre.name = data.name
    genre.save()
    return genre


def delete_genre(genre: Genre) -> None:
    genre.delete()
