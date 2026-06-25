from books.models import Book
from lists.dto import CreateListInput, UpdateListInput
from lists.models import List


class ListService:
    def delete_list(self, list_instance: List):
        list_instance.delete()

    def create_list(self, data: CreateListInput) -> List:
        list_instance = List.objects.create(
            name=data.name,
            description=data.description,
            cover=data.cover,
            user=data.user,
        )

        self._set_relations(list_instance=list_instance, book_ids=data.book_ids)
        return list_instance

    def update_list(self, data: UpdateListInput, list_instance: List) -> List:
        if data.name is not None:
            list_instance.name = data.name

        if data.description is not None:
            list_instance.description = data.description

        if data.cover is not None:
            list_instance.cover = data.cover

        self._set_relations(list_instance=list_instance, book_ids=data.book_ids)

        list_instance.save()
        return list_instance

    def _set_relations(self, list_instance: List, book_ids: list[int] | None):
        if book_ids is not None:
            books = Book.objects.filter(id__in=book_ids)
            list_instance.books.add(*books)
