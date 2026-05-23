from users.dto.auth import AuthTokensOutput
from users.dto.user import UserOutput
from users.services.auth import authenticate_user, issue_tokens
from users.selectors.user import user_to_output
from users.validators.register import validate_login_input


class LoginUserUseCase:
    def execute(self, **raw) -> tuple[UserOutput, AuthTokensOutput]:
        data = validate_login_input(**raw)
        user = authenticate_user(data)
        tokens = issue_tokens(user, remember_me=data.remember_me)
        return user_to_output(user), tokens
