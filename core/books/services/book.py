from django.db import transaction
from books.dto.book import CreateBookInput, UpdateBookInput
from books.models import Author, Book, Genre, Series, SeriesMembership


class BookService:

    @transaction.atomic
    def create_book(self, data: CreateBookInput) -> Book:
        book = Book.objects.create(
            title=data.title,
            description=data.description,
            image=data.image,
        )

        self._set_relations(book, data.author_ids, data.genre_ids)
        return book

    @transaction.atomic
    def update_book(self, book: Book, data: UpdateBookInput) -> Book:

        self._update_fields(book, data)
        self._set_relations(book, data.author_ids, data.genre_ids)

        book.save()
        return book

    def _update_fields(self, book: Book, data: UpdateBookInput) -> None:
        if data.title is not None:
            book.title = data.title

        if data.description is not None:
            book.description = data.description

        if data.image is not None:
            book.image = data.image

    def _set_relations(
        self,
        book: Book,
        author_ids: list[int] | None,
        genre_ids: list[int] | None,
    ) -> None:

        if author_ids is not None:
            authors = Author.objects.filter(id__in=author_ids)
            book.authors.set(authors)

        if genre_ids is not None:
            genres = Genre.objects.filter(id__in=genre_ids)
            book.genres.set(genres)

    def add_book_to_series(self, book: Book, series: Series, index: int):
        SeriesMembership.objects.create(
            book=book,
            series=series,
            index=index,
        )

    def delete_book(self, book: Book) -> None:
        book.delete()
