from datetime import timedelta

from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from users.dto.auth import AuthTokensOutput, LoginInput
from users.exceptions import AuthError

User = get_user_model()

REFRESH_SHORT = timedelta(days=1)
REFRESH_LONG = timedelta(days=30)


def authenticate_user(data: LoginInput) -> User:
    user = User.objects.filter(email__iexact=data.email).first()
    if user is None:
        raise AuthError("Correo o contraseña incorrectos.", "invalid_credentials")
    authenticated = authenticate(username=user.username, password=data.password)
    if authenticated is None:
        raise AuthError("Correo o contraseña incorrectos.", "invalid_credentials")
    if not authenticated.is_active:
        raise AuthError("Esta cuenta está desactivada.", "account_disabled")
    return authenticated


def issue_tokens(user: User, *, remember_me: bool = False) -> AuthTokensOutput:
    refresh = RefreshToken.for_user(user)
    lifetime = REFRESH_LONG if remember_me else REFRESH_SHORT
    refresh.set_exp(lifetime=lifetime)
    return AuthTokensOutput(access=str(refresh.access_token), refresh=str(refresh))
