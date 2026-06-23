from lists.exceptions import ListError
from lists.dto import UpdateListInput
from lists.models import List
from lists.selectors import ListSelector
from lists.services import ListService


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

        list_instance = ListSelector().get_list_by_id(list_id=list_id)

        if list_instance is None:
            raise ListError("List not found")

        list_instance = ListService().update_list(
            data=list_dto, list_instance=list_instance
        )

        return list_instance
