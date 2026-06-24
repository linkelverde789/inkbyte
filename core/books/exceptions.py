class AppError(Exception):
    def __init__(self, message: str, code: str):
        self.message = message
        self.code = code
        super().__init__(message)


class BookError(AppError):
    def __init__(self, message: str, code: str = "book_error"):
        super().__init__(message=message, code=code)


class AuthorError(AppError):
    def __init__(self, message: str, code: str = "author_error"):
        super().__init__(message=message, code=code)


class SeriesError(AppError):
    def __init__(self, message: str, code: str = "series_error"):
        super().__init__(message=message, code=code)


class GenreError(AppError):
    def __init__(self, message: str, code: str = "genre_error"):
        super().__init__(message=message, code=code)


class FileError(AppError):
    def __init__(self, message: str, code: str = "file_error"):
        super().__init__(message=message, code=code)


class RatingError(AppError):
    def __init__(self, message: str, code: str = "rating_error"):
        super().__init__(message=message, code=code)
