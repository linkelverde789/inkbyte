import pytest
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)

from users.models import User
from pathlib import Path


@pytest.mark.django_db
def test_login(api_client):

    email = "test@test.com"
    password = "pass1234"

    User.objects.create_user(password=password, email=email, username="login username")

    res = api_client.post(
        "/api/auth/login/", data={"password": password, "email": email}, format="json"
    )

    assert res.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_signup(api_client):

    email = "test@test.com"
    password = "some_password_secure"
    username = "username_test"
    first_name = "name"
    last_name = "name 2"

    res = api_client.post(
        "/api/auth/register/",
        data={
            "password": password,
            "password_confirm": password,
            "email": email,
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
        },
        format="json",
    )

    assert res.status_code == HTTP_201_CREATED

    assert User.objects.filter(email=email).first().email == email


@pytest.mark.django_db
def test_signup_with_simple_password(api_client):

    email = "test@test.com"
    password = "easy123"
    username = "username_test"
    first_name = "name"
    last_name = "name 2"

    res = api_client.post(
        "/api/auth/register/",
        data={
            "password": password,
            "password_confirm": password,
            "email": email,
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
        },
        format="json",
    )

    assert res.status_code == HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_auth_me(auth_client, user):

    auth_client.login(email=user.email, password=user.password)
    res = auth_client.get("/api/auth/me/")

    assert res.status_code == HTTP_200_OK

    assert res.data["user"]["id"] == user.id


@pytest.mark.django_db
def test_logout(auth_client):
    res = auth_client.post("/api/auth/logout/")

    assert res.status_code == HTTP_204_NO_CONTENT

    # force client api logout
    auth_client.logout()

    res = auth_client.get("/api/auth/me/")

    assert res.status_code == HTTP_200_OK

    assert res.data["user"] == None


@pytest.mark.django_db
def test_user_can_update_data(auth_client, user):
    image_path = Path("fixtures/test_image.png")
    with open(image_path, "rb") as f:
        image = f.read()
        auth_client.patch(
            path="/api/profile/", data={"profile_picture": image}, format="multipart"
        )

    email = "updated_email@test.com"
    _partial_update(auth_client, {"email": email}, 200)
    username = "username_update"
    _partial_update(auth_client, {"username": username}, 200)

    first_name = "Arthur update"
    _partial_update(auth_client, {"first_name": first_name}, 200)

    last_name = "Morgan update"
    _partial_update(auth_client, {"last_name": last_name}, 200)
    user_instance = User.objects.filter(id=user.id).first()

    assert user_instance.email == email
    assert user_instance.first_name == first_name
    assert user_instance.last_name == last_name
    assert user_instance.username == username
    assert user_instance.profile_picture is not None


def _partial_update(auth_client, data, status_code):
    res = auth_client.patch(path="/api/profile/", data=data, format="json")

    assert res.status_code == status_code
