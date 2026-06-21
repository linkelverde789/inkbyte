from users.models import User
from users.dto.auth import AuthTokensOutput
from users.services.auth import authenticate_user, issue_tokens
from users.validators.register import validate_login_input


class LoginUserUseCase:
    def execute(self, **raw) -> tuple[User, AuthTokensOutput]:
        data = validate_login_input(**raw)
        user = authenticate_user(data)
        tokens = issue_tokens(user, remember_me=data.remember_me)
        return user, tokens
