from books.exceptions import GenreError


class CreateGenreInput:
    name: str

    def validate(self) -> "CreateGenreInput":
        self.name = self.name.strip()

        if not self.name:
            raise GenreError("The name is required")

        return self


class UpdateGenreInput:
    name: str

    def validate(self) -> "UpdateGenreInput":
        self.name = self.name.strip()

        if not self.name:
            raise GenreError("The name is required")

        return self
