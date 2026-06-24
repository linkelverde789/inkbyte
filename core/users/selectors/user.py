from django.contrib.auth import get_user_model


User = get_user_model()


class UserSelector:

    def email_exists(self, email: str, user_id: int | None = None) -> bool:
        queryset = User.objects.filter(email__iexact=email)

        if user_id is not None:
            queryset = queryset.exclude(id=user_id)

        return queryset.exists()

    def username_exists(self, username: str, user_id: int | None = None) -> bool:
        queryset = User.objects.filter(username__iexact=username)
        if user_id is not None:
            queryset = queryset.exclude(id=user_id)
        return queryset.exists()

    def get_user_by_email(self, email: str) -> User | None:
        return User.objects.filter(email__iexact=email).first()

    def get_user_by_username(self, username: str) -> User | None:
        return User.objects.filter(username__iexact=username).first()

    def get_user_by_id(self, user_id: int) -> User | None:
        return User.objects.filter(pk=user_id).first()
