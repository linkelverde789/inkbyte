from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

from users.dto.auth import LoginInput, RegisterInput
from users.exceptions import AuthError
from users.selectors.user import email_exists


def validate_register_input(
    *,
    email: str,
    password: str,
    password_confirm: str,
    first_name: str = "",
    last_name: str = "",
    remember_me: bool = False,
) -> RegisterInput:
    email = (email or "").strip().lower()
    first_name = (first_name or "").strip()
    last_name = (last_name or "").strip()

    if not email:
        raise AuthError("El correo es obligatorio.", "email_required")
    if "@" not in email:
        raise AuthError("Introduce un correo válido.", "email_invalid")
    if email_exists(email):
        raise AuthError("Ya existe una cuenta con este correo.", "email_taken")
    if not password:
        raise AuthError("La contraseña es obligatoria.", "password_required")
    if password != password_confirm:
        raise AuthError("Las contraseñas no coinciden.", "password_mismatch")
    try:
        validate_password(password)
    except DjangoValidationError as exc:
        raise AuthError("; ".join(exc.messages), "password_weak") from exc

    return RegisterInput(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        remember_me=remember_me,
    )


def validate_login_input(
    *,
    email: str,
    password: str,
    remember_me: bool = False,
) -> LoginInput:
    email = (email or "").strip().lower()

    if not email:
        raise AuthError("El correo es obligatorio.", "email_required")
    if not password:
        raise AuthError("La contraseña es obligatoria.", "password_required")

    return LoginInput(email=email, password=password, remember_me=remember_me)
