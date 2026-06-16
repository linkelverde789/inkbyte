from rest_framework_simplejwt.authentication import JWTAuthentication

from users.services.cookies import ACCESS_COOKIE


class CookieJWTAuthentication(JWTAuthentication):
    """JWT desde cookie HttpOnly; admite Authorization para clientes API."""

    def authenticate(self, request):
        header = self.get_header(request)
        if header is not None:
            return super().authenticate(request)

        raw_token = request.COOKIES.get(ACCESS_COOKIE)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
