from dataclasses import dataclass

from books.exceptions import RatingError
from books.models import Book
from users.models import User


@dataclass
class RatingBookInput:
    user: User
    book: Book
    rate: int

    def validate(self) -> "RatingBookInput":
        user = self.user
        rate = self.rate
        book = self.book

        if not user:
            raise RatingError("Must be a user")

        if not book:
            raise RatingError("Must be a book")

        if not rate:
            raise RatingError("Must be a rating")

        if rate < 0:
            raise RatingError("Rating can't be lower than 0")

        if rate > 5:
            raise RatingError("Rating can't be higher than 5")

        return self
