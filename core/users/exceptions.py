class AuthError(Exception):
    def __init__(self, message: str, code: str = "auth_error"):
        self.message = message
        self.code = code
        super().__init__(message)


class UserError(Exception):
    def __init__(self, message: str, code: str = "user_error"):
        self.message = message
        self.code = code
        super().__init__(message)
