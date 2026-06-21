import pytest
from rest_framework.test import APIClient

from books.models import Book
from users.models import User


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

    assert response.status_code == 200
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
