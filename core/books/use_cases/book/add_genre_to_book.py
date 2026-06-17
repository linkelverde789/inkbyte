from books.selectors.book import BookSelector
from books.selectors.genre import GenreSelector
from books.services.book import add_genre_to_book


class AddGenreToBookUseCase:
    def execute(self, genre_id: int, book_id: int):
        genre = GenreSelector.get_genre_by_id(genre_id)
        book = BookSelector.get_book_by_id(book_id)
        add_genre_to_book(genre=genre, book=book)
        return
