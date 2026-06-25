from lists.services import ListService
from lists.dto import CreateListInput
from lists.models import List
from users.models import User


class CreateListUseCase:
    def execute(
        self,
        name: str,
        user: User,
        description: str | None = None,
        cover: str | None = None,
        book_ids: list[int] | None = None,
    ) -> List:
        list_dto = CreateListInput(
            name=name,
            description=description,
            cover=cover,
            user=user,
            book_ids=book_ids,
        ).validate()

        list_instance = ListService().create_list(data=list_dto)

        return list_instance
