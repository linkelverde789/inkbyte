class AppError(Exception):
    def __init__(self, message: str, code: str):
        self.message = message
        self.code = code
        super().__init__(message)


class BookError(AppError):
    def __init__(self, message: str):
        super().__init__(message=message, code="book_error")


class AuthorError(AppError):
    def __init__(self, message: str):
        super().__init__(message, "author_error")


class SeriesError(AppError):
    def __init__(self, message: str):
        super().__init__(message, "series_error")


class GenreError(AppError):
    def __init__(self, message: str):
        super().__init__(message, "genre_error")


class FileError(AppError):
    def __init__(self, message: str):
        super().__init__(message, "file_error")
