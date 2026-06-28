from django.contrib.auth import get_user_model
from books.models import Book
from books.dto.rating import RatingBookInput
from books.services.rating import RatingService
from books.exceptions import BookError
from books.selectors.book import BookSelector

User = get_user_model()


class RateBookUseCase:
    def execute(self, user: User, book_id: int, rate: int) -> Book:

        book_instance = BookSelector().get_book_by_id(book_id=book_id)

        if book_instance is None:
            raise BookError("Book not found", "not_found")

        rating_dto = RatingBookInput(
            user=user, book=book_instance, rate=rate
        ).validate()
        RatingService().rate_book(data=rating_dto)

        book_instance.refresh_from_db
        return book_instance
