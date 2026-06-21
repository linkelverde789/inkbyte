from events.selectors import EventSelector


class ListEventUseCase:
    def execute(self, *, page: int = 1, page_size: int = 12):
        events = EventSelector().list_events()
        return events.paginate(page=page, page_size=page_size)
