from events.dto import CreateEventInput
from events.models import EventType
from events.services import EventService


class CreateEventUseCase:
    def execute(
        self,
        *,
        type: EventType,
        user=None,
        target=None,
        metadata=None,
    ):
        return EventService.create(
            data=CreateEventInput(
                type=type,
                user=user,
                target=target,
                metadata=metadata,
            )
        )
