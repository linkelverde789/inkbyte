from django.db import transaction
from books.dto.genre import CreateGenreInput, UpdateGenreInput
from books.models import Book, Genre


class GenreService:
    @transaction.atomic
    def create_genre(self, genre: CreateGenreInput) -> Genre:
        return Genre.objects.create(name=genre.name)

    def update_genre(self, genre: Genre, data: UpdateGenreInput) -> Genre:
        genre.name = data.name
        genre.save()
        return genre

    def delete_genre(self, genre: Genre) -> None:
        genre.delete()
