from books.selectors.book import BookSelector
from books.selectors.file import FileSelector


class GetFilesFromBookUseCase:
    def execute(self, book_id: int):
        book = BookSelector().get_book_by_id(book_id)
        return FileSelector().get_files_for_book(book=book)
