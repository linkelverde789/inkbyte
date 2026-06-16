from books.dto.book import CreateBookInput, UpdateBookInput
from books.models import Book

def create_book(data: CreateBookInput)-> Book:
    return Book.objects.create(
        title=data.title,
        description=data.description,
        image=data.image
    )

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