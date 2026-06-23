from lists.exceptions import ListError
from lists.models import List
from lists.selectors import ListSelector


class GetListUseCase:
    def execute(self, list_id: int) -> List | None:
        list = ListSelector().get_list_by_id(list_id)
        if list is None:
            raise ListError("List not found")

        return list
