from events.selectors import EventSelector
from events.models import EventType
from books.models import Book


class GetBookEventStatsUseCase:
    def execute(self, start_date, end_date, event_type: EventType, page_size: int = 5):

        queryset = EventSelector().get_book_stats(
            start_date=start_date, end_date=end_date, event_type=event_type
        )

        top = queryset[:page_size]

        book_ids = [t["object_id"] for t in top]
        books = Book.objects.in_bulk(book_ids)

        result = [
            {
                "book": books[entry["object_id"]],
                "count": entry["downloads"],
            }
            for entry in top
            if entry["object_id"] in books
        ]

        return result
