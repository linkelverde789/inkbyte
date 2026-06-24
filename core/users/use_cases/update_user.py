from django.contrib.auth import get_user_model
from users.dto.user import UpdateUserInput
from users.services.user import UserService

User = get_user_model()


class UpdateUserUseCase:
    def execute(
        self,
        user: User,
        username: str | None = None,
        profile_picture: object | None = None,
        email: str | None = None,
        first_name: str | None = None,
        last_name: str | None = None,
    ) -> User:

        user_dto = UpdateUserInput(
            username=username,
            profile_picture=profile_picture,
            email=email,
            first_name=first_name,
            last_name=last_name,
        ).validate(user_id=user.id)

        user_instance = UserService().update_user(data=user_dto, user=user)
        return user_instance
