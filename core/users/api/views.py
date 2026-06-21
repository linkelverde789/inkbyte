from dataclasses import asdict

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from events.models import EventType
from events.use_cases.create_event import CreateEventUseCase
from users.api.serializers import (
    AuthResponseSerializer,
    LoginSerializer,
    RegisterSerializer,
)
from users.dto.auth import AuthTokensOutput
from users.exceptions import AuthError
from users.selectors.user import user_to_output
from users.services.cookies import (
    clear_auth_cookies,
    get_refresh_token,
    set_auth_cookies,
)
from users.use_cases.login_user import LoginUserUseCase
from users.use_cases.register_user import RegisterUserUseCase


def _auth_success_response(
    user_output, tokens_output, *, remember_me: bool, status_code=200
):
    response = Response(
        AuthResponseSerializer({"user": asdict(user_output)}).data,
        status=status_code,
    )
    return set_auth_cookies(response, tokens_output, remember_me=remember_me)


def _error_response(exc: AuthError) -> Response:
    return Response(
        {"detail": exc.message, "code": exc.code},
        status=status.HTTP_400_BAD_REQUEST,
    )


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        remember_me = serializer.validated_data.get("remember_me", False)
        try:
            user_output, tokens_output = RegisterUserUseCase().execute(
                **serializer.validated_data
            )
        except AuthError as exc:
            return _error_response(exc)
        return _auth_success_response(
            user_output,
            tokens_output,
            remember_me=remember_me,
            status_code=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        remember_me = serializer.validated_data.get("remember_me", False)
        try:
            user, tokens_output = LoginUserUseCase().execute(
                **serializer.validated_data
            )
        except AuthError as exc:
            return _error_response(exc)

        CreateEventUseCase().execute(
            event_type=EventType.LOGIN,
            user=user,
            target=user,
            metadata={
                "path": request.path,
                "method": request.method,
            },
        )
        return _auth_success_response(
            user_to_output(user=user),
            tokens_output,
            remember_me=remember_me,
        )


class MeView(APIView):
    """Returns the current user or null without 401 (SPA session probe)."""

    permission_classes = [AllowAny]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"user": None})
        output = user_to_output(request.user)
        return Response(
            AuthResponseSerializer({"user": asdict(output)}).data,
        )


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_value = get_refresh_token(request)
        if refresh_value:
            try:
                RefreshToken(refresh_value).blacklist()
            except TokenError:
                pass
        response = Response(status=status.HTTP_204_NO_CONTENT)
        return clear_auth_cookies(response)


class CookieTokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_value = get_refresh_token(request)
        if not refresh_value:
            response = Response(status=status.HTTP_204_NO_CONTENT)
            return clear_auth_cookies(response)
        try:
            refresh = RefreshToken(refresh_value)
            access = str(refresh.access_token)
            tokens = AuthTokensOutput(access=access, refresh=str(refresh))
        except TokenError:
            response = Response(
                {"detail": "Sesión expirada."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
            return clear_auth_cookies(response)

        response = Response(status=status.HTTP_204_NO_CONTENT)
        return set_auth_cookies(response, tokens, remember_me=False)
