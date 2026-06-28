from django.contrib.auth import get_user_model
from books.models import Book, Rating

User = get_user_model()


class RatingSelector:
    def get_rating_by_id(self, rating_id: int) -> Rating | None:
        return Rating.objects.filter(id=rating_id).first()

    def get_rating_by_user_and_book(self, book: Book, user: User) -> Rating | None:
        return Rating.objects.filter(user=user, book=book).first()
