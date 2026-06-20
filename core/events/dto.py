from dataclasses import dataclass
from typing import Any

from events.models import EventType


@dataclass
class CreateEventInput:
    type: EventType
    user: Any | None = None
    target: Any | None = None
    metadata: dict[str, Any] | None = None
