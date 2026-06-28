from django.contrib.auth import get_user_model
from books.exceptions import BookError
from books.models import Rating
from books.selectors.book import BookSelector
from books.selectors.rating import RatingSelector
from books.dto.rating import RatingBookOutput

User = get_user_model()


class GetRatingUseCase:
    def execute(self, book_id: int, user: User) -> Rating | None:
        book_instance = BookSelector().get_book_by_id(book_id=book_id)

        if book_instance is None:
            raise BookError("Book not found", "not_found")

        rating_instance = RatingSelector().get_rating_by_user_and_book(
            user=user, book=book_instance
        )

        return RatingBookOutput(
            rate=rating_instance.rate if rating_instance else None,
            book=book_instance,
            user=user,
        )
