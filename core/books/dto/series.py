from dataclasses import dataclass

from books.exceptions import SeriesError


@dataclass
class CreateSeriesInput:
    name: str
    description: str = ""

    def validate(self) -> "CreateSeriesInput":
        self.name = self.name.strip()

        if self.description is not None:
            self.description = self.description.strip()

        if not self.name:
            raise SeriesError("The name is required")

        return self


@dataclass
class UpdateSeriesInput:
    name: str | None = None
    description: str | None = None

    def validate(self) -> "UpdateSeriesInput":
        if self.name is not None:
            self.name = self.name.strip()

        if not self.name:
            raise SeriesError("The name can't be empty")

        if self.description is not None:
            self.description = self.description.strip()

        return self
