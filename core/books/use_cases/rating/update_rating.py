from books.dto.rating import UpdateRatingInput
from books.models import Rating
from books.selectors.rating import RatingSelector
from books.services.rating import RatingService


class UpdateRatingUseCase:
    def execute(self, rating_id: int, **raw) -> Rating:
        rating_dto = UpdateRatingInput(**raw).validate()
        rating = RatingSelector().get_rating_by_id(rating_id)
        rating = RatingService().update_rating(rating=rating, data=rating_dto)
        return rating
