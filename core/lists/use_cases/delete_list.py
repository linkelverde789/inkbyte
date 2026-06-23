from users.models import User
from lists.exceptions import ListError
from lists.selectors import ListSelector
from lists.services import ListService


class DeleteListUseCase:
    def execute(self, list_id: int, user: User):
        list_instance = ListSelector().get_list_by_id(list_id=list_id)
        if list_instance is None:
            raise ListError("List not found")
        if list_instance.user != user:
            raise ListError("Can't edit other user lists")
        return ListService().delete_list(list_instance)
