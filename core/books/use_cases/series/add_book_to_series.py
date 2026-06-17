from books.selectors.book import BookSelector
from books.selectors.series import SeriesSelector
from books.services.series import add_book_to_series


class AddBookToSeriesUseCase:
    def execute(self, book_id: int, series_id: int, index: int | None) -> None:
        book = BookSelector.get_book_by_id(book_id)
        series = SeriesSelector.get_series_by_id(series_id)
        if index is None:
            index = SeriesSelector.get_last_index_from_series(series)
            index = 1 if index is None else index+1
        add_book_to_series(book, series, index)
        return
