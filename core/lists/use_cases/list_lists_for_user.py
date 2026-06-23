from users.models import User
from lists.selectors import ListSelector
from query_pipeline import QuerySetPipeline


class ListListForUserUseCase:
    def execute(self, page: int, page_size: int, user: User):
        queryset = ListSelector().list_lists().filter(user=user)
        return QuerySetPipeline(queryset).paginate(page=page, page_size=page_size)
