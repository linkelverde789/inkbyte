from events.models import EventType


BOOK_EVENTS = {
    EventType.BOOK_DOWNLOAD,
    EventType.BOOK_VIEW,
    EventType.BOOK_RATED,
}

USER_EVENTS = {
    EventType.LOGIN,
    EventType.LOGOUT,
}
