from books.exceptions import AppError


class EventError(AppError):
    def __init__(self, message: str, code: str = "event_error"):
        super().__init__(message=message, code=code)
