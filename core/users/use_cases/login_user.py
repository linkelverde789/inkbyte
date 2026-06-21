from typing import Any
from events.models import EventType
from events.use_cases.create_event import CreateEventUseCase
from users.selectors.user import user_to_output
from users.dto.user import UserOutput
from users.dto.auth import AuthTokensOutput
from users.services.auth import authenticate_user, issue_tokens
from users.validators.register import validate_login_input


class LoginUserUseCase:
    def execute(
        self,
        email: str,
        password: str,
        remember_me: bool = False,
        metadata: dict[str, Any] | None = None,
    ) -> tuple[UserOutput, AuthTokensOutput]:
        data = validate_login_input(
            email=email, password=password, remember_me=remember_me
        )
        user = authenticate_user(data)
        tokens = issue_tokens(user, remember_me=data.remember_me)
        CreateEventUseCase().execute(
            event_type=EventType.LOGIN, user=user, target=user, metadata=metadata
        )
        return user_to_output(user), tokens
