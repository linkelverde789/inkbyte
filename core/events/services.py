from django.contrib.contenttypes.models import ContentType
from events.dto import CreateEventInput
from events.models import Event


class EventService:
    @staticmethod
    def create(*, data: CreateEventInput):
        content_type = None
        object_id = None

        if data.target is not None:
            content_type = ContentType.objects.get_for_model(
                data.target,
                for_concrete_model=False,
            )
            object_id = data.target.pk

        return Event.objects.create(
            event_type=data.type,
            user=data.user,
            content_type=content_type,
            object_id=object_id,
            metadata=data.metadata or {},
        )
