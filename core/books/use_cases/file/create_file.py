from books.models import File
from books.selectors.book import BookSelector
from books.services.file import FileService


class CreateFileUseCase:
    def execute(self, file, book_id: int) -> File:
        book = BookSelector.get_book_by_id(book_id)
        return FileService().create_file(file, book=book)
