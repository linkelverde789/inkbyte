    
from core.books.models import Genre


class GenreSelector:    
    def get_genre_by_id(genre_id: int) -> Genre | None:
        return Genre.objects.filter(pk=genre_id).first()

    def get_genre_by_name(genre_name: str) -> Genre | None:
        return Genre.objects.filter(name__icontains=genre_name).first()
    
    def list_genres():
        return Genre.objects.order_by("name")