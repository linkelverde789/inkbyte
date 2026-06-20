from books.models import Book, File


class FileSelector:
    def get_file_from_id(self, file_id: int) -> File:
        return File.objects.filter(id=file_id)

    def get_files_for_book(self, book: Book):
        return book.files.all()
