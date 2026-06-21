from typing import Any
from events.models import EventType
from events.use_cases.create_event import CreateEventUseCase
from users.dto.user import UserOutput
from users.selectors.user import user_to_output
from users.dto.auth import AuthTokensOutput
from users.services.auth import issue_tokens
from users.services.user import create_user
from users.validators.register import validate_register_input


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
    ) -> tuple[UserOutput, AuthTokensOutput]:
        data = validate_register_input(
            email=email,
            password=password,
            password_confirm=password_confirm,
            first_name=first_name,
            last_name=last_name,
            username=username,
            remember_me=remember_me,
        )
        user = create_user(data)
        tokens = issue_tokens(user, remember_me=data.remember_me)

        CreateEventUseCase().execute(
            event_type=EventType.SIGNUP,
            user=user,
            target=user,
            metadata=metadata,
        )

        return user_to_output(user), tokens
