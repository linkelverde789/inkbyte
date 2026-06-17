from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS


class PublicReadPrivateWriteMixin:
    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]
        return [IsAuthenticated()]