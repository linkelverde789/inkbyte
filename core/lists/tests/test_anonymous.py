import pytest
from rest_framework.status import (
    HTTP_401_UNAUTHORIZED,
)

from lists.models import List


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

    list_instance = List.objects.create(name="To delete", user=user)

    response = api_client.patch(
        path=f"/api/lists/{list_instance.id}/", data={"name": "new name"}, format="json"
    )

    assert response.status_code == HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_anonymous_user_can_not_delete_list(user, api_client):

    list_instance = List.objects.create(name="To delete", user=user)

    response = api_client.delete(path=f"/api/lists/{list_instance.id}/")

    assert response.status_code == HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_anonymous_user_can_not_retrieve_list_stats(api_client):
    response = api_client.get("/api/lists/mine/stats/")
    assert response.status_code == HTTP_401_UNAUTHORIZED
