from django.db import transaction

from books.models import Book, File


class FileService:
    @transaction.atomic
    def create_file(self, file, book: Book) -> File:
        return File.objects.create(file=file, book=book)

    def delete_file(self, file: File) -> None:
        file.delete()
