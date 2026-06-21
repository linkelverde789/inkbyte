from books.models import Book
from books.selectors.author import AuthorSelector
from books.selectors.book import BookSelector
from books.services.book import BookService


class AddAuthorToBook:
    def execute(self, book_id: int, author_id: int) -> Book:
        book = BookSelector().get_book_by_id(book_id)
        author = AuthorSelector().get_author_by_id(author_id)
        book = BookService().add_author_to_book(author=author, book=book)
        return book
