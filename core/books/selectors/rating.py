from books.models import Rating


class RatingSelector:
    def get_rating_by_id(self, rating_id: int) -> Rating | None:
        return Rating.objects.filter(id=rating_id).first()
