from settings.settings import AUTH_USER_MODEL
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models


class EventType(models.TextChoices):
    SIGNUP = "signup", "Sign Up"
    LOGIN = "login", "Login"
    LOGOUT = "logout", "Logout"
    BOOK_DOWNLOAD = "book:download", "Book download"
    BOOK_VIEW = "book:view", "Book viewed"
    BOOK_LIST_VIEW = "list:book:view", "Book list viewed"
    BOOK_RATED = "book:rated", "Book rated"
    BOOK_SEARCH = "book:search", "Books searched"


class TargetType(models.TextChoices):
    BOOK = "book", "Book"
    AUTHOR = "author", "Author"
    SERIES = "series", "Series"


class Event(models.Model):
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="events",
    )

    event_type = models.CharField(
        max_length=50,
        choices=EventType.choices,
    )

    metadata = models.JSONField(default=dict, blank=True)

    content_type = models.ForeignKey(
        ContentType,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)

    target = GenericForeignKey("content_type", "object_id")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["event_type", "created_at"]),
            models.Index(fields=["user", "created_at"]),
            models.Index(fields=["content_type", "object_id"]),
        ]
