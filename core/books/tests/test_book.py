import pytest

from books.models import Author, Book, Genre


@pytest.mark.django_db
def test_list_books(api_client):
    Book.objects.create(title="Book 1")
    Book.objects.create(title="Book 2")

    response = api_client.get("/api/books/")

    assert response.status_code == 200
    assert response.data["count"] == 2
    assert len(response.data["results"]) == 2
    assert response.data["results"][0]["title"] == "Book 1"


@pytest.mark.django_db
def test_get_book(api_client):
    book = Book.objects.create(title="Individual book")

    response = api_client.get(f"/api/books/{book.id}/")

    assert response.status_code == 200
    assert response.data["title"] == book.title


@pytest.mark.django_db
def test_create_books(auth_client):
    response = auth_client.post(
        "/api/books/",
        data={"title": "test 1", "description": "description", "image": None},
        format="json",
    )

    assert response.status_code == 201
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

    assert response.status_code == 200

    updated_book = Book.objects.filter(id=book.id).first()
    assert updated_book.description == "this is a book description"


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

    assert response.status_code == 200
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

    assert response.status_code == 200
    response = auth_client.get(path=f"/api/books/{book.id}/")

    assert len(response.data["genres"]) == 3


@pytest.mark.django_db
def test_add_author_to_book(auth_client):
    book = Book.objects.create(title="Book to add author")
    author = Author.objects.create(name="King")
    response = auth_client.patch(
        path=f"/api/books/{book.id}/", data={"author_ids": [author.id]}
    )

    assert response.status_code == 200
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

    assert response.status_code == 200
    response = auth_client.get(path=f"/api/books/{book.id}/")

    assert len(response.data["authors"]) == 3


@pytest.mark.django_db
def test_check_filters_from_book_list(auth_client):
    genre = Genre.objects.create(name="Crime")
    author = Author.objects.create(name="Brandon Sanderson")

    for item in range(0, 100):
        data = {
            "title": f"Title {item}",
        }
        if item % 2 == 0:
            data["author_ids"] = [author.id]
        else:
            data["genre_ids"] = [genre.id]

        auth_client.post(
            "/api/books/",
            data=data,
            format="json",
        )

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
