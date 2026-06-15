from django.contrib.auth import get_user_model

from users.dto.user import UserOutput

User = get_user_model()


def email_exists(email: str) -> bool:
    return User.objects.filter(email__iexact=email).exists()

def username_exists(username: str) -> bool:
    return User.objects.filter(username__iexact=username).exists()


def get_user_by_email(email: str) -> User | None:
    return User.objects.filter(email__iexact=email).first()

def get_user_by_username(username: str) -> User | None:
    return User.objects.filter(username__iexact=username).first()


def get_user_by_id(user_id: int) -> User | None:
    return User.objects.filter(pk=user_id).first()


def user_to_output(user: User) -> UserOutput:
    picture = None
    if user.profile_picture:
        picture = user.profile_picture.url
    return UserOutput(
        id=user.id,
        email=user.email,
        username=user.username,
        first_name=user.first_name or "",
        last_name=user.last_name or "",
        profile_picture=picture,
    )
