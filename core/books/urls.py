from django.urls import path

from books.api.views.authors import AuthorDetailView, AuthorListCreateView
from books.api.views.books import (
    BookDetailView,
    BookListCreateView,
    BooksFromAuthorView,
    BooksFromSeriesView,
)


urlpatterns = [
    path("books/", BookListCreateView.as_view(), name="book-list-create"),
    path("books/<int:book_id>/", BookDetailView.as_view(), name="book-detail"),
    path("authors/", AuthorListCreateView.as_view(), name="author-list-create"),
    path("authors/<int:author_id>/", AuthorDetailView.as_view(), name="author-detail"),
    path(
        "books/series/<int:series_id>/",
        BooksFromSeriesView.as_view(),
        name="books-from-series",
    ),
    path(
        "books/author/<int:author_id>/",
        BooksFromAuthorView.as_view(),
        name="books-from-author",
    ),
]
