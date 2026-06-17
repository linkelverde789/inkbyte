from django.urls import path

from books.api.views import BookDetailView, BookListCreateView
from books.api.views import AuthorDetailView, AuthorListCreateView


urlpatterns = [
    path("books/", BookListCreateView.as_view(), name="book-list-create"),
    path("books/<int:book_id>/", BookDetailView.as_view(), name="book-detail"),
    path("authors/", AuthorListCreateView.as_view(), name="author-list-create"),
    path("authors/<int:author_id>/", AuthorDetailView.as_view(), name="author-detail"),
]
