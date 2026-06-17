from dataclasses import dataclass
from typing import Generic, TypeVar, Tuple
from django.db.models import QuerySet

T = TypeVar("T")


@dataclass
class QuerySetPipeline(Generic[T]):
    queryset: QuerySet[T]

    def filter(self, **kwargs):
        return QuerySetPipeline(self.queryset.filter(**kwargs))

    def order_by(self, *fields):
        return QuerySetPipeline(self.queryset.order_by(*fields))

    def paginate(self, *, page: int = 1, page_size: int = 12) -> Tuple[list[T], int]:
        total = self.queryset.count()
        start = (page - 1) * page_size
        end = start + page_size
        return list(self.queryset[start:end]), total