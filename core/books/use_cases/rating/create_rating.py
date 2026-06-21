from books.models import Book
from books.dto.rating import CreateRatingInput
from books.services.rating import RatingService


class CreateRatingUseCase:
    def execute(self, **raw) -> Book:
        rating_dto = CreateRatingInput(**raw).validate()
        rating = RatingService().create_rating(data=rating_dto)
        return rating
