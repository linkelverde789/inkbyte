from books.models import Author


class AuthorSelector:
    def get_author_by_id(self, author_id: int) -> Author | None:
        return Author.objects.filter(pk=author_id).first()

    def get_author_by_name(self, author_name: str) -> Author | None:
        return Author.objects.filter(name__icontains=author_name).first()

    def get_authors_by_name(self, author_name: str):
        return Author.objects.filter(name__icontains=author_name)

    def list_author(self):
        return Author.objects.all()
