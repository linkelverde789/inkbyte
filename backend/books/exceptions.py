class BookError(Exception):
    def __init__(self, message: str, code: str = "book_error"):
        self.message = message
        self.code = code
        super().__init__(message)