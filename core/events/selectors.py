from datetime import timedelta
from django.contrib.contenttypes.models import ContentType
from django.db.models import Count
from books.models import Book
from events.models import Event, EventType


class EventSelector:
    @staticmethod
    def get_event_by_id(event_id: int) -> Event | None:
        return Event.objects.filter(pk=event_id).first()

    @staticmethod
    def list_events():
        return Event.objects.all().order_by("id")

    @staticmethod
    def list_events_by_target(object_id: int, model):
        content_type = ContentType.objects.get_for_model(model)
        queryset = Event.objects.filter(
            content_type=content_type,
            object_id=object_id,
        )
        return queryset

    def get_book_stats(self, start_date, end_date, event_type: EventType):
        book_ct = ContentType.objects.get_for_model(Book)
        return (
            Event.objects.filter(
                event_type=event_type,
                content_type=book_ct,
                created_at__range=(start_date, end_date + timedelta(days=1)),
            )
            .values("object_id")
            .annotate(downloads=Count("id"))
            .order_by("-downloads")
        )
