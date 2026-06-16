from books.dto.author import CreateAuthorInput, UpdateAuthorInput
from books.models import Author


def create_author(data: CreateAuthorInput) -> Author:
    return Author.objects.create(
        name=data.name, description=data.description, image=data.image
    )


def update_author(author: Author, data: UpdateAuthorInput) -> Author:
    if data.name is not None:
        author.name = data.title
    if data.description is not None:
        author.description = data.description
    if data.image is not None:
        author.image = data.image
    author.save()
    return author

def delete_author(author: Author) -> None:
    author.delete()