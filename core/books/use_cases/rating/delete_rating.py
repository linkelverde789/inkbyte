from books.selectors.rating import RatingSelector
from books.services.rating import RatingService


class DeleteRatingUseCase:
    def execute(self, rating_id: int) -> None:
        rating = RatingSelector().get_rating_by_id(rating_id=rating_id)
        RatingService().delete_rating(rating=rating)
