from books.exceptions import AppError


class ListError(AppError):
    def __init__(self, message: str, code: str = "list_error"):
        super().__init__(message=message, code=code)
