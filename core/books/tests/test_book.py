from django.contrib.contenttypes.models import ContentType
import pytest

from books.models import Author, Book, Genre
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)

from events.models import Event, EventType


@pytest.mark.django_db
def test_list_books(api_client):
    Book.objects.create(title="Book 1")
    Book.objects.create(title="Book 2")

    response = api_client.get("/api/books/")

    assert response.status_code == HTTP_200_OK
    assert response.data["count"] == 2
    assert len(response.data["results"]) == 2
    assert response.data["results"][0]["title"] == "Book 1"


@pytest.mark.django_db
def test_get_book(api_client):
    book = Book.objects.create(title="Individual book")

    response = api_client.get(f"/api/books/{book.id}/")

    assert response.status_code == HTTP_200_OK
    assert response.data["title"] == book.title


@pytest.mark.django_db
def test_create_books(auth_client):
    response = auth_client.post(
        "/api/books/",
        data={"title": "test 1", "description": "description", "image": None},
        format="json",
    )

    assert response.status_code == HTTP_201_CREATED
    assert response.data["title"] == "test 1"
    assert "id" in response.data


@pytest.mark.django_db
def test_update_books(auth_client):

    book = Book.objects.create(title="Book number 4")

    response = auth_client.patch(
        path=f"/api/books/{book.id}/",
        data={"description": "this is a book description"},
        format="json",
    )

    assert response.status_code == HTTP_200_OK

    book.refresh_from_db()
    assert book.description == "this is a book description"


@pytest.mark.django_db
def test_delete_book(auth_client):
    book = Book.objects.create(title="Book to delete")
    response = auth_client.delete(path=f"/api/books/{book.id}/")

    assert response.status_code == 204

    assert Book.objects.filter(id=book.id).exists() == False


@pytest.mark.django_db
def test_add_genre_to_book(auth_client):
    book = Book.objects.create(title="Book to add genre")
    genre = Genre.objects.create(name="Action")
    response = auth_client.patch(
        path=f"/api/books/{book.id}/", data={"genre_ids": [genre.id]}
    )

    assert response.status_code == HTTP_200_OK
    response = auth_client.get(path=f"/api/books/{book.id}/")

    assert response.data["genres"][0]["name"] == genre.name


@pytest.mark.django_db
def test_add_multiple_genres_to_book(auth_client):
    book = Book.objects.create(title="Book to add genre")
    created_genres = []
    for genres in ["Action", "Fantasy", "Mystery"]:
        created_genres.append(Genre.objects.create(name=genres).id)

    response = auth_client.patch(
        path=f"/api/books/{book.id}/", data={"genre_ids": created_genres}
    )

    assert response.status_code == HTTP_200_OK
    response = auth_client.get(path=f"/api/books/{book.id}/")

    assert len(response.data["genres"]) == 3


@pytest.mark.django_db
def test_add_author_to_book(auth_client):
    book = Book.objects.create(title="Book to add author")
    author = Author.objects.create(name="King")
    response = auth_client.patch(
        path=f"/api/books/{book.id}/", data={"author_ids": [author.id]}
    )

    assert response.status_code == HTTP_200_OK
    response = auth_client.get(path=f"/api/books/{book.id}/")

    assert response.data["authors"][0]["name"] == author.name


@pytest.mark.django_db
def test_add_authors_to_book(auth_client):
    book = Book.objects.create(title="Book to add authors")
    created_authors = []
    for name in ["Christie", "Sanderson", "Pratchett"]:
        created_authors.append(Author.objects.create(name=name).id)

    response = auth_client.patch(
        path=f"/api/books/{book.id}/", data={"author_ids": created_authors}
    )

    assert response.status_code == HTTP_200_OK
    response = auth_client.get(path=f"/api/books/{book.id}/")

    assert len(response.data["authors"]) == 3


@pytest.mark.django_db
def test_check_filters_from_book_list(auth_client):
    genre = Genre.objects.create(name="Crime")
    author = Author.objects.create(name="Brandon Sanderson")

    books = [Book(title=f"Title {i}") for i in range(100)]
    books = Book.objects.bulk_create(books)

    for i, book in enumerate(books):
        if i % 2 == 0:
            book.authors.add(author)
        else:
            book.genres.add(genre)

    # Check pagination and page_size
    response = auth_client.get(
        "/api/books/", data={"page": 1, "page_size": 100}, format="json"
    )

    assert response.data["count"] == 100

    # Check text filter
    response = auth_client.get(
        "/api/books/", data={"page_size": 100, "q": "Title 0"}, format="json"
    )

    assert response.data["count"] == 1
    assert response.data["results"][0]["title"] == "Title 0"

    # Check author filter
    response = auth_client.get(
        "/api/books/", data={"page_size": 100, "author_id": author.id}, format="json"
    )
    assert response.data["count"] == 50

    # Check genre filter
    response = auth_client.get(
        "/api/books/", data={"page_size": 100, "genre_id": genre.id}, format="json"
    )
    assert response.data["count"] == 50


@pytest.mark.django_db
def test_rate_book(auth_client):
    book = Book.objects.create(title="Some title")

    res = auth_client.put(f"/api/books/{book.id}/rating/", data={"rating": 5})

    assert res.status_code == HTTP_200_OK

    res = auth_client.get(f"/api/books/{book.id}/rating/")

    assert res.data["rate"] == 5


@pytest.mark.django_db
def test_get_book_stats(api_client):
    book_for_download = Book.objects.create(title="Some downloads")
    book_for_views = Book.objects.create(title="Some views")
    book_ct = ContentType.objects.get_for_model(Book)

    events_for_download = [
        Event(
            event_type=EventType.BOOK_DOWNLOAD,
            target=book_for_download,
            content_type=book_ct,
        )
        for i in range(0, 100)
    ]

    events_for_views = [
        Event(
            event_type=EventType.BOOK_VIEW,
            target=book_for_views,
            content_type=book_ct,
        )
        for i in range(0, 100)
    ]

    Event.objects.bulk_create(events_for_download)
    Event.objects.bulk_create(events_for_views)

    res = api_client.get("/api/books/stats/", data={"type": "downloads"}, format="json")

    assert res.data[0]["count"] == 100
    assert res.data[0]["book"]["id"] == book_for_download.id

    res = api_client.get("/api/books/stats/", data={"type": "views"}, format="json")

    assert res.data[0]["count"] == 100
    assert res.data[0]["book"]["id"] == book_for_views.id


@pytest.mark.django_db
def test_check_book_stats_filters(api_client):
    res = api_client.get("/api/books/stats/", data={"type": "rating"}, format="json")

    assert res.status_code == HTTP_400_BAD_REQUEST

    res = api_client.get("/api/books/stats/", data={"type": "views"}, format="json")

    assert res.status_code == HTTP_200_OK

    res = api_client.get("/api/books/stats/", data={"type": "downloads"}, format="json")

    assert res.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_anonymous_user_cant_rate(api_client):
    book = Book.objects.create(title="Some title")

    res = api_client.put(f"/api/books/{book.id}/rating/", data={"rating": 5})

    assert res.status_code == HTTP_401_UNAUTHORIZED

    res = api_client.get(f"/api/books/{book.id}/rating/")

    assert res.status_code == HTTP_401_UNAUTHORIZED
