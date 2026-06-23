import pytest
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.test import APIClient

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

    list = List.objects.filter(user=user).first()
    assert list.name == "My list"


@pytest.mark.django_db
def test_update_list(api_client, user):
    api_client.force_authenticate(user=user)

    list = List.objects.create(name="Some name", user=user)
    data = {"name": "Updated name", "description": "Some description"}
    response = api_client.patch(path=f"/api/lists/{list.id}/", data=data, format="json")

    assert response.status_code == HTTP_200_OK

    assert List.objects.filter(id=list.id).first().name == "Updated name"


@pytest.mark.django_db
def test_delete_list(api_client, user):
    api_client.force_authenticate(user=user)

    list = List.objects.create(name="To delete", user=user)

    response = api_client.delete(path=f"/api/lists/{list.id}/")

    assert response.status_code == HTTP_204_NO_CONTENT


## Anonymous User test ##


@pytest.mark.django_db
def test_anonymous_user_can_not_retrieve_list(api_client, user):
    List.objects.bulk_create([List(name=f"Name {i}", user=user) for i in range(15)])

    response = api_client.get(
        path="/api/lists/", data={"page_size": 100}, format="json"
    )

    assert response.status_code == HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_anonymous_user_can_not_retrieve_my_lists(api_client, user):
    List.objects.bulk_create([List(name=f"Name {i}", user=user) for i in range(15)])

    response = api_client.get(
        path="/api/lists/mine/", data={"page_size": 100}, format="json"
    )

    assert response.status_code == HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_anonymous_user_can_not_create_list(api_client):

    data = {"name": "My list", "description": "Some description"}

    response = api_client.post(path="/api/lists/", data=data, format="json")

    assert response.status_code == HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_anonymous_user_can_not_update_list(api_client, user):

    list = List.objects.create(name="To delete", user=user)

    response = api_client.patch(
        path=f"/api/lists/{list.id}/", data={"name": "new name"}, format="json"
    )

    assert response.status_code == HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_anonymous_user_can_not_delete_list(user, api_client):

    list = List.objects.create(name="To delete", user=user)

    response = api_client.delete(path=f"/api/lists/{list.id}/")

    assert response.status_code == HTTP_401_UNAUTHORIZED
