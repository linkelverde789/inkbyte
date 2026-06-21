from users.models import User
from users.dto.auth import AuthTokensOutput
from users.dto.user import UserOutput
from users.services.auth import issue_tokens
from users.services.user import create_user
from users.selectors.user import user_to_output
from users.validators.register import validate_register_input


class RegisterUserUseCase:
    def execute(self, **raw) -> tuple[User, AuthTokensOutput]:
        data = validate_register_input(**raw)
        user = create_user(data)
        tokens = issue_tokens(user, remember_me=data.remember_me)
        return user, tokens
