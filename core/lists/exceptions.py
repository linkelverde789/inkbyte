from books.exceptions import AppError


class ListError(AppError):
    def __init__(self, message: str):
        super().__init__(message=message, code="list_error")
