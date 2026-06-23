from lists.exceptions import ListError
from lists.selectors import ListSelector
from lists.services import ListService


class DeleteListUseCase:
    def execute(self, list_id):
        list = ListSelector().get_list_by_id(list_id=list_id)
        if list is None:
            raise ListError("List not found")
        return ListService().delete_list(list)
