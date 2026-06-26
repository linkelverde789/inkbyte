from dataclasses import dataclass

from lists.exceptions import ListError
from users.models import User


@dataclass
class CreateListInput:
    name: str
    user: User
    description: str = ""
    cover: str | None = None
    book_ids: list[int] = None

    def validate(self) -> "CreateListInput":
        self.name = self.name.strip()
        self.description = self.description.strip()
        if not self.name:
            raise ListError("The name is required")

        self.book_ids = self.book_ids or []

        return self


@dataclass
class UpdateListInput:
    name: str | None
    description: str | None = None
    cover: str | None = None
    book_ids: list[int] = None

    def validate(self) -> "UpdateListInput":
        if self.name is not None:
            self.name = self.name.strip()
            if not self.name:
                raise ListError("The name can't be empty")
        if self.description is not None:
            self.description = self.description.strip()

        return self


@dataclass
class ChartItemDTO:
    name: str
    value: int


@dataclass
class ListStats:
    genres: list[ChartItemDTO]
    authors: list[ChartItemDTO]
    books_count: int
