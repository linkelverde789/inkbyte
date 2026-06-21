from books.dto.author import CreateAuthorInput, UpdateAuthorInput
from books.models import Author


class AuthorService:

    def create_author(self, data: CreateAuthorInput) -> Author:

        return Author.objects.create(
            name=data.name, description=data.description, image=data.image
        )

    def update_author(self, author: Author, data: UpdateAuthorInput) -> Author:
        if data.name is not None:
            author.name = data.title
        if data.description is not None:
            author.description = data.description
        if data.image is not None:
            author.image = data.image
        author.save()
        return author

    def delete_author(self, author: Author) -> None:
        author.delete()
