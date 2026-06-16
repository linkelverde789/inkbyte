from books.models import Author
from books.dto.author import AuthorOutput


class AuthorSelector:
    def get_author_by_id(author_id: int) -> Author | None:
        return Author.objects.filter(pk=author_id).first()

    def list_author():
        return Author.objects.order_by("name")

    def author_to_output(author: Author) -> AuthorOutput:
        return AuthorOutput(
            id=author.id,
            name=author.name,
            description=author.description,
            image=author.image if author.image else None,
        )
