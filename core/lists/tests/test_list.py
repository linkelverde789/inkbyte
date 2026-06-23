import pytest
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED

from lists.models import List


@pytest.mark.django_db
def test_create_list(api_client, user):
    api_client.force_authenticate(user=user)

    data = {"name": "My list", "description": "Some description"}

    response = api_client.post(path="/api/profile/lists/", data=data, format="json")

    assert response.status_code == HTTP_201_CREATED

    list = List.objects.filter(user=user).first()
    assert list.name == "My list"
