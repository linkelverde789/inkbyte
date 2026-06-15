from django.contrib.auth import get_user_model

from users.dto.auth import RegisterInput

User = get_user_model()


#TODO remove this unused function
def _unique_username(email: str) -> str:
    base = email.replace("@", "_at_").replace(".", "_")
    candidate = base[:150]
    if not User.objects.filter(username=candidate).exists():
        return candidate
    suffix = 1
    while True:
        trimmed = base[: 150 - len(str(suffix)) - 1]
        candidate = f"{trimmed}_{suffix}"
        if not User.objects.filter(username=candidate).exists():
            return candidate
        suffix += 1


def create_user(data: RegisterInput) -> User:
    return User.objects.create_user(
        username=data.username,
        email=data.email,
        password=data.password,
        first_name=data.first_name,
        last_name=data.last_name,
    )
