from django.db import transaction
from books.dto.book import CreateBookInput, UpdateBookInput
from books.models import Author, Book, Genre

@transaction.atomic
def create_book(data: CreateBookInput)-> Book:
    book = Book.objects.create(
        title=data.title,
        description=data.description,
        image=data.image
    )
    
    create_book_relations(book, data)
    return book

def _create_book_author_relation(book: Book, author_ids: list[int]):
    if not author_ids:
        return

    authors = Author.objects.filter(id__in=author_ids)
    book.authors.set(authors)

def _create_book_genre_relation(book: Book, genre_ids: list[int]):
    if not genre_ids:
        return

    genres = Genre.objects.filter(id__in=genre_ids)
    book.genres.set(genres)

def create_book_relations(book: Book, data: CreateBookInput):
    _create_book_author_relation(book, data.author_ids)
    _create_book_genre_relation(book, data.genre_ids)

def update_book(book: Book, data: UpdateBookInput) -> Book:
    if data.title is not None:
        book.title = data.title
    if data.description is not None:
        book.description = data.description
    if data.image is not None:
        book.image = data.image
    book.save()
    return book

def delete_book(book: Book) -> None:
    book.delete()