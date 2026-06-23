from users.models import User
from lists.selectors import ListSelector
from query_pipeline import QuerySetPipeline


class ListListForUserUseCase:
    def execute(
        self,
        user: User,
        page: int = 1,
        page_size: int = 12,
    ):
        queryset = ListSelector().list_lists().filter(user=user)
        queryset = QuerySetPipeline(queryset)
        return queryset.paginate(page=page, page_size=page_size)
