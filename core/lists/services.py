from books.models import Book
from lists.dto import CreateListInput, UpdateListInput
from lists.models import List


class ListService:
    def delete_list(self, list: List):
        list.delete()

    def create_list(self, data: CreateListInput) -> List:
        list = List.objects.create(
            name=data.name,
            description=data.description,
            image=data.image,
            user=data.user,
        )

        self._set_relations(list=list, book_ids=data.book_ids)
        return list

    def update_list(self, data: UpdateListInput, list: List) -> List:
        if data.name is not None:
            list.name = data.name

        if data.description is not None:
            list.description = data.description

        if data.image is not None:
            list.image = data.image

        self._set_relations(list=list, book_ids=data.book_ids)

        list.save()
        return list

    def _set_relations(self, list: List, book_ids: list[int] | None):
        if book_ids is not None:
            books = Book.objects.filter(id__in=book_ids)
            list.books.set(books)
