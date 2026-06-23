from dataclasses import dataclass

from users.selectors.user import UserSelector
from users.exceptions import UserError


@dataclass()
class UpdateUserInput:
    username: str | None = None
    profile_picture: object | None = None
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None

    def validate(self) -> "UpdateUserInput":
        if self.username is not None:
            self.username = self.username.strip()
            if not self.username:
                raise UserError("The username can't be empty")
            if UserSelector().username_exists(self.username):
                raise UserError("The username already exists")

        if self.email is not None:
            self.email = self.email.strip()
            if not self.email:
                raise UserError("The email can't be empty")

        if self.first_name is not None:
            self.first_name = self.first_name.strip()

        if self.last_name is not None:
            self.last_name = self.last_name.strip()

        return self
