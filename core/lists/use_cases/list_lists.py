from lists.selectors import ListSelector
from query_pipeline import QuerySetPipeline


class ListListUseCase:
    def execute(self, page: int = 1, page_size: int = 12):
        queryset = ListSelector().list_lists()
        return QuerySetPipeline(queryset).paginate(page=page, page_size=page_size)
