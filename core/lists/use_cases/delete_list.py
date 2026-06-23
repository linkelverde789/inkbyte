from lists.services import ListService


class DeleteListUseCase:
    def execute(self, list_id):
        return ListService().delete_list(list_id)
