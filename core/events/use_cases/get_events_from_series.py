from books.models import Series
from query_pipeline import QuerySetPipeline
from events.selectors import EventSelector


class GetEventFromSeriesUseCase:
    def execute(self, *, series_id: int, page_size: int = 12, page: int = 1):
        events = QuerySetPipeline(
            EventSelector().list_events_by_target(object_id=series_id, model=Series)
        )

        return events.paginate(page=page, page_size=page_size)
