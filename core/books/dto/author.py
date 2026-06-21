from dataclasses import dataclass

from books.exceptions import AuthorError


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
            raise AuthorError("The name is required")

        return self


@dataclass
class UpdateAuthorInput:
    name: str | None = None
    description: str | None = None
    image: object | None = None

    def validate(self) -> "UpdateAuthorInput":
        if self.name is not None:
            self.name = self.name.strip()

            if not self.name:
                raise AuthorError("The name can't be empty")

        if self.description is not None:
            self.description = self.description.strip()

        return self
