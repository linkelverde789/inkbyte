from books.models import Rating
from books.dto.rating import RatingBookInput


class RatingService:
    def rate_book(self, data: RatingBookInput) -> Rating:
        return Rating.objects.update_or_create(
            user=data.user,
            book=data.book,
            defaults={
                "rate": data.rate,
            },
        )
