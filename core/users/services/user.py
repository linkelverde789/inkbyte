from django.contrib.auth import get_user_model

from users.dto.user import UpdateUserInput
from users.dto.auth import RegisterInput

User = get_user_model()


class UserService:

    def create_user(self, data: RegisterInput) -> User:
        return User.objects.create_user(
            username=data.username,
            email=data.email,
            password=data.password,
            first_name=data.first_name,
            last_name=data.last_name,
        )

    def update_user(self, data: UpdateUserInput, user: User) -> User:
        old_picture = user.profile_picture

        if data.username is not None:
            user.username = data.username

        if data.first_name is not None:
            user.first_name = data.first_name

        if data.last_name is not None:
            user.last_name = data.last_name

        if data.email is not None:
            user.email = data.email

        if data.profile_picture is not None:
            user.profile_picture = data.profile_picture

        user.save()

        if data.profile_picture is not None and old_picture:
            old_picture.delete(save=False)

        return user
