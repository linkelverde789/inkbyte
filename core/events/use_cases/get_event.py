from events.exceptions import EventError
from events.models import Event
from events.selectors import EventSelector


class GetEventUseCase:
    def execute(self, *, event_id: int) -> Event:
        event = EventSelector.get_event_by_id(event_id=event_id)
        if not event:
            raise EventError("Event not found")
        return event
