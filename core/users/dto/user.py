from dataclasses import dataclass


@dataclass(frozen=True)
class UserOutput:
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    profile_picture: str | None
