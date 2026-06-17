from datetime import datetime, timedelta, timezone

from django.conf import settings
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import UntypedToken

from users.dto.auth import AuthTokensOutput

ACCESS_COOKIE = "inkbyte_access"
REFRESH_COOKIE = "inkbyte_refresh"

REFRESH_SHORT = timedelta(days=1)
REFRESH_LONG = timedelta(days=30)


def _cookie_options(*, max_age: int) -> dict:
    secure = not settings.DEBUG
    return {
        "httponly": True,
        "secure": secure,
        "samesite": "Lax",
        "path": "/",
        "max_age": max_age,
    }


def _access_max_age() -> int:
    lifetime = settings.SIMPLE_JWT.get("ACCESS_TOKEN_LIFETIME", timedelta(minutes=5))
    return int(lifetime.total_seconds())


def _refresh_max_age(*, remember_me: bool) -> int:
    lifetime = REFRESH_LONG if remember_me else REFRESH_SHORT
    return int(lifetime.total_seconds())


def _max_age_from_jwt(token: str, *, fallback: int) -> int:
    try:
        payload = UntypedToken(token)
        exp = payload.get("exp")
        if exp is None:
            return fallback
        remaining = int(exp) - int(datetime.now(timezone.utc).timestamp())
        return max(0, remaining)
    except Exception:
        return fallback


def set_auth_cookies(
    response: HttpResponse,
    tokens: AuthTokensOutput,
    *,
    remember_me: bool = False,
) -> HttpResponse:
    refresh_fallback = _refresh_max_age(remember_me=remember_me)
    response.set_cookie(
        ACCESS_COOKIE,
        tokens.access,
        **_cookie_options(
            max_age=_max_age_from_jwt(tokens.access, fallback=_access_max_age()),
        ),
    )
    response.set_cookie(
        REFRESH_COOKIE,
        tokens.refresh,
        **_cookie_options(
            max_age=_max_age_from_jwt(tokens.refresh, fallback=refresh_fallback),
        ),
    )
    return response


def clear_auth_cookies(response: HttpResponse) -> HttpResponse:
    for name in (ACCESS_COOKIE, REFRESH_COOKIE):
        response.delete_cookie(name, path="/", samesite="Lax")
    return response


def get_refresh_token(request) -> str | None:
    return request.COOKIES.get(REFRESH_COOKIE)
