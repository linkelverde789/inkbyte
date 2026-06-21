from books.models import Genre


class GenreSelector:
    def get_genre_by_id(self, genre_id: int) -> Genre | None:
        return Genre.objects.filter(pk=genre_id).first()

    def get_genre_by_name(self, genre_name: str) -> Genre | None:
        return Genre.objects.filter(name__icontains=genre_name).first()

    def list_genres(self):
        return Genre.objects.order_by("name")
