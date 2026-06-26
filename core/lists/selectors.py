from django.contrib.auth import get_user_model
from django.db.models import Count
from books.models import Author, Book, Genre
from lists.models import List

User = get_user_model()


class ListSelector:
    def get_list_by_id(self, list_id: int) -> List | None:
        return List.objects.filter(id=list_id).first()

    def list_lists(self):
        return List.objects.all().order_by("id")

    def get_genre_stats(self, user: User):
        return (
            Genre.objects.filter(books__lists__user=user)
            .annotate(value=Count("books", distinct=True))
            .values("name", "value")
            .order_by("-value")
        )

    def get_author_stats(self, user: User):
        return (
            Author.objects.filter(books__lists__user=user)
            .annotate(value=Count("books"))
            .values("name", "value")
            .order_by("-value")
        )

    def get_book_count(self, user: User) -> int:
        return Book.objects.filter(lists__user=user).count()
