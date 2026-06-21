from books.dto.book import *
from books.services.book import BookService
from books.selectors.book import *
from books.selectors.file import FileSelector
from books.services.file import FileService


class DeleteFileUseCase:
    def execute(self, file_id: int) -> None:
        file = FileSelector().get_file_from_id(file_id=file_id)
        FileService().delete_file(file)
