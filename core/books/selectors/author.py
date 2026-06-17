from django.contrib.postgres.lookups import Unaccent
from books.models import Author


class AuthorSelector:
    def get_author_by_id(author_id: int) -> Author | None:
        return Author.objects.filter(pk=author_id).first()
    

    def get_author_by_name(author_name: str) -> Author | None:
        return (
            Author.objects
            .filter(name__icontains=author_name)
            .first()
        )
    
    def get_authors_by_name(author_name: str):
        return (
            Author.objects
            .filter(name__icontains=author_name)
        )

    def list_author():
        return Author.objects.order_by("name")
