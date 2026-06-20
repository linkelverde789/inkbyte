from books.models import Rating
from books.dto.rating import CreateRatingInput, UpdateRatingInput


class RatingService:
    def create_rating(self, data: CreateRatingInput) -> Rating:
        return Rating.objects.create(user=data.user, book=data.book, rate=data.rate)

    def update_rating(self, data: UpdateRatingInput, rating: Rating) -> Rating:
        rating.rate = data.rate
        rating.save()
        return rating

    def delete_rating(self, rating: Rating) -> None:
        rating.delete()
