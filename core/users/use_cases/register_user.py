from typing import Any

from django.contrib.auth import get_user_model
from events.models import EventType
from events.use_cases.create_event import CreateEventUseCase
from users.dto.auth import AuthTokensOutput
from users.services.auth import issue_tokens
from users.services.user import UserService
from users.validators.register import validate_register_input

User = get_user_model()


class RegisterUserUseCase:
    def execute(
        self,
        email: str,
        password: str,
        password_confirm: str,
        first_name: str = "",
        last_name: str = "",
        username: str = "",
        remember_me: bool = False,
        metadata: dict[str, Any] | None = None,
    ) -> tuple[User, AuthTokensOutput]:
        data = validate_register_input(
            email=email,
            password=password,
            password_confirm=password_confirm,
            first_name=first_name,
            last_name=last_name,
            username=username,
            remember_me=remember_me,
        )
        user = UserService().create_user(data)
        tokens = issue_tokens(user, remember_me=data.remember_me)

        CreateEventUseCase().execute(
            event_type=EventType.SIGNUP,
            user=user,
            target=user,
            metadata=metadata,
        )

        return user, tokens
