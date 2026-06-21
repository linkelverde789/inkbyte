from dataclasses import dataclass
from books.exceptions import BookError


@dataclass
class BookTypeOutput:
    id: int
    name: str


@dataclass
class GenreOutput:
    id: int
    name: str


@dataclass
class AuthorOutput:
    id: int
    name: str


@dataclass
class CreateBookInput:
    title: str
    description: str = ""
    image: object | None = None

    type_id: int | None = None
    genre_ids: list[int] = None
    author_ids: list[int] = None

    def validate(self) -> "CreateBookInput":
        self.title = self.title.strip()
        self.description = self.description.strip()

        if not self.title:
            raise BookError("The title is required")

        self.genre_ids = self.genre_ids or []
        self.author_ids = self.author_ids or []

        return self


@dataclass
class UpdateBookInput:
    title: str | None = None
    description: str | None = None
    image: object | None = None

    type_id: int | None = None
    genre_ids: list[int] | None = None
    author_ids: list[int] | None = None

    def validate(self) -> "UpdateBookInput":
        if self.title is not None:
            self.title = self.title.strip()
            if not self.title:
                raise BookError("The title can't be empty")

        if self.description is not None:
            self.description = self.description.strip()

        return self


@dataclass
class BookFilters:
    q: str = ""
    author: str = ""
