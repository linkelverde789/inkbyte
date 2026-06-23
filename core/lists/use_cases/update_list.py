from lists.dto import UpdateListInput
from lists.models import List
from lists.selectors import ListSelector
from lists.services import ListService
from users.models import User


class UpdateListUseCase:
    def execute(
        self,
        list_id: int,
        name: str,
        description: str | None = None,
        image: object | None = None,
        book_ids: list[int] | None = None,
    ) -> List:
        list_dto = UpdateListInput(
            name=name,
            description=description,
            image=image,
            book_ids=book_ids,
        ).validate()

        list = ListSelector().get_list_by_id(list_id=list_id)

        list = ListService().update_list(data=list_dto, list=list)

        return list
