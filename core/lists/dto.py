from dataclasses import dataclass

from lists.exceptions import ListError
from users.models import User


@dataclass
class CreateListInput:
    name: str
    user: User
    description: str = ""
    image: object | None = None
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
    name: str | None = None
    description: str | None = None
    image: object | None = None
    book_ids: list[int] = None

    def validate(self) -> "UpdateListInput":
        if self.name is not None:
            self.name = self.name.strip()
            if not self.name:
                raise ListError("The name can't be empty")
        if self.description is not None:
            self.description = self.description.strip()

        return self
