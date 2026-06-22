from django.contrib.contenttypes.models import ContentType
from events.models import Event


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
