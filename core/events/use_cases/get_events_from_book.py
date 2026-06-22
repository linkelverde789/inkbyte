from books.models import Book
from query_pipeline import QuerySetPipeline
from events.selectors import EventSelector


class GetEventFromBookUseCase:
    def execute(self, *, book_id: int, page_size: int = 12, page: int = 1):
        events = QuerySetPipeline(
            EventSelector().list_events_by_target(object_id=book_id, model=Book)
        )
        return events.paginate(page=page, page_size=page_size)
