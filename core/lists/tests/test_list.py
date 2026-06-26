import pytest
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.test import APIClient

from books.models import Book
from users.models import User
from lists.models import List


@pytest.mark.django_db
def test_get_lists(api_client, user):
    List.objects.bulk_create([List(name=f"Name {i}", user=user) for i in range(15)])

    api_client.force_authenticate(user=user)

    response = api_client.get(
        path="/api/lists/", data={"page_size": 100}, format="json"
    )

    assert response.data["count"] == 15


@pytest.mark.django_db
def test_get_only_my_lists():
    api_client = APIClient()

    user1 = User.objects.create(
        username="test1", email="test1@mail.com", password="testpassword1."
    )
    user2 = User.objects.create(
        username="test2", email="test2@mail.com", password="testpassword2."
    )

    List.objects.bulk_create([List(name=f"Name {i}", user=user1) for i in range(15)])
    List.objects.bulk_create([List(name=f"Name {i+15}", user=user2) for i in range(5)])

    api_client.force_authenticate(user=user2)

    response = api_client.get(
        path="/api/lists/mine/", data={"page_size": 100}, format="json"
    )

    assert response.data["count"] == 5

    api_client.force_authenticate(user=user1)
    response = api_client.get(
        path="/api/lists/mine/", data={"page_size": 100}, format="json"
    )

    assert response.data["count"] == 15

    response = api_client.get(
        path="/api/lists/", data={"page_size": 100}, format="json"
    )

    assert response.data["count"] == 20


@pytest.mark.django_db
def test_create_list(api_client, user):
    api_client.force_authenticate(user=user)

    data = {"name": "My list", "description": "Some description"}

    response = api_client.post(path="/api/lists/", data=data, format="json")

    assert response.status_code == HTTP_201_CREATED

    list_instance = List.objects.filter(user=user).first()
    assert list_instance.name == "My list"


@pytest.mark.django_db
def test_update_list(api_client, user):
    api_client.force_authenticate(user=user)

    list_instance = List.objects.create(name="Some name", user=user)
    data = {"name": "Updated name", "description": "Some description", "cover": "blue"}
    response = api_client.patch(
        path=f"/api/lists/{list_instance.id}/", data=data, format="json"
    )

    assert response.status_code == HTTP_200_OK

    list_instance.refresh_from_db()

    assert list_instance.name == "Updated name"
    assert list_instance.description == "Some description"
    assert list_instance.cover == "blue"


@pytest.mark.django_db
def test_other_user_cant_update_list(api_client, user):
    list_instance = List.objects.create(name="Some name", user=user)

    other_user = User.objects.create(
        username="other", email="other@mail.com", password="testpassword2."
    )

    api_client.force_authenticate(user=other_user)

    data = {"name": "Updated name", "description": "Some description"}
    response = api_client.patch(
        path=f"/api/lists/{list_instance.id}/", data=data, format="json"
    )

    assert response.status_code == HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_other_user_cant_delete_list(api_client, user):

    list_instance = List.objects.create(name="To delete", user=user)
    other_user = User.objects.create(
        username="other", email="other@mail.com", password="testpassword2."
    )
    api_client.force_authenticate(user=other_user)
    response = api_client.delete(path=f"/api/lists/{list_instance.id}/")

    assert response.status_code == HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_delete_list(api_client, user):
    api_client.force_authenticate(user=user)

    list_instance = List.objects.create(name="To delete", user=user)

    response = api_client.delete(path=f"/api/lists/{list_instance.id}/")

    assert response.status_code == HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_add_book_to_list(api_client, user):
    api_client.force_authenticate(user=user)

    book = Book.objects.create(title="Some book title")
    new_book = Book.objects.create(title="Some new book title")

    list_instance = List.objects.create(
        name="Some name",
        user=user,
    )

    def update_books(book_ids):
        response = api_client.patch(
            f"/api/lists/{list_instance.id}/",
            {"book_ids": book_ids},
            format="json",
        )
        assert response.status_code == HTTP_200_OK

        list_instance.refresh_from_db()
        return set(list_instance.books.values_list("id", flat=True))

    assert update_books([book.id]) == {book.id}
    assert update_books([new_book.id]) == {new_book.id}
    assert update_books([new_book.id, book.id]) == {book.id, new_book.id}
