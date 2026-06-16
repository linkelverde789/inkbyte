
from dataclasses import dataclass
from typing import Optional

from books.exceptions import BookError


@dataclass()
class BookTypeOutput:
    id: int
    name: str

@dataclass()
class GenreOutput:
    id: int
    name: str

@dataclass()
class BookOutput:
    id: int
    title: str
    image: str | None
    description: str | None
    type: BookTypeOutput | None
    genres: tuple[GenreOutput, ...] | None

@dataclass()
class CreateBookInput:
    title: str
    description: str
    image: Optional[object] = None
    type_id: int | None = None
    genre_ids: tuple[int, ...] = ()

    def validate(self) -> "CreateBookInput":
        self.title = self.title.strip()
        self.description = self.description.strip()

        if not self.title:
            raise BookError("The title is required", "title_required")
        
        if not self.description:
            raise BookError("The description is required", "description_required")
        
        return self


@dataclass()
class UpdateBookInput:
    title: str | None = None
    description: str | None = None
    image=None
    type_id: int | None = None
    genre_ids: tuple[int, ...] | None = None

    def validate(self) -> "CreateBookInput":
        self.title = self.title.strip() if self.title else None
        self.description = self.description.strip() if self.description else None

        if not self.title:
            raise BookError("The title can't be empty", "title_required")
        
        if not self.description:
            raise BookError("The description can't be empty", "description_required")
        
        return self