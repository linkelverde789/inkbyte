from books.dto.book import *
from books.services.book import create_book
from books.selectors.book import *


class DeleteBookUseCase:
    def execute(self, **raw) -> BookOutput:
        #TODO
        raise