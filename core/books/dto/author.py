from dataclasses import dataclass
from typing import Optional

from books.exceptions import AuthorError

@dataclass
class AuthorOutput:
    id: int
    name: str
    description: Optional[str]
    image: object | None = None

@dataclass
class CreateAuthorInput:
    name: str
    description: str = ""
    image: object | None = None

    def validate(self) -> "CreateAuthorInput":
        self.name = self.name.strip()

        if self.description is not None:
            self.description = self.description.strip()

        if not self.name:
            raise AuthorError("The name is required", "name_required")
        
        return self

@dataclass
class UpdateAuthorInput:
    name: str | None = None
    description: str | None = None
    image: object | None = None

    def validate(self) -> "UpdateAuthorInput":
        if self.name is not None:
            self.title = self.title.strip()

        if not self.name:
            raise AuthorError("The name can't be empty", "name_required")


        if self.description is not None:
            self.description = self.description.strip()

        return self