from users.models import User
from events.selectors import EventSelector


class GetEventFromUserUseCase:
    def execute(self, *, user_id: int, page_size: int = 12, page: int = 1):
        events = EventSelector.list_events_by_target(object_id=user_id, model=User)

        return events.paginate(page=page, page_size=page_size)
