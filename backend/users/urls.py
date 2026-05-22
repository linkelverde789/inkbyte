from django.urls import path

from users.api.views import (
    CookieTokenRefreshView,
    LoginView,
    LogoutView,
    MeView,
    RegisterView,
)

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/logout/", LogoutView.as_view(), name="auth-logout"),
    path("auth/me/", MeView.as_view(), name="auth-me"),
    path("auth/token/refresh/", CookieTokenRefreshView.as_view(), name="auth-token-refresh"),
]
