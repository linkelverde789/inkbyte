from books.exceptions import AppError


class EventError(AppError):
    def __init__(self, message: str):
        super().__init__(message=message, code="event_error")
