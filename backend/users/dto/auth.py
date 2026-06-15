from dataclasses import dataclass


@dataclass(frozen=True)
class RegisterInput:
    email: str
    password: str
    username: str
    first_name: str = ""
    last_name: str = ""
    remember_me: bool = False


@dataclass(frozen=True)
class LoginInput:
    email: str
    password: str
    remember_me: bool = False


@dataclass(frozen=True)
class AuthTokensOutput:
    access: str
    refresh: str
