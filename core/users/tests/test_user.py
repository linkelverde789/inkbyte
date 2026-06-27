import pytest
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)

from users.models import User
from pathlib import Path
from django.core.files.uploadedfile import SimpleUploadedFile


def _partial_update(auth_client, data, status_code):
    res = auth_client.patch(path="/api/profile/", data=data, format="json")

    assert res.status_code == status_code


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
    email = "updated_email@test.com"
    username = "username_update"
    first_name = "Arthur update"
    last_name = "Morgan update"

    with open(image_path, "rb") as f:
        profile_picture = SimpleUploadedFile(
            name="test_image.png", content=f.read(), content_type="image/png"
        )
        auth_client.patch(
            path="/api/profile/",
            data={"profile_picture": profile_picture},
            format="multipart",
        )

    _partial_update(auth_client, {"email": email}, HTTP_200_OK)
    _partial_update(auth_client, {"username": username}, HTTP_200_OK)
    _partial_update(auth_client, {"first_name": first_name}, HTTP_200_OK)
    _partial_update(auth_client, {"last_name": last_name}, HTTP_200_OK)

    user.refresh_from_db()

    assert user.email == email
    assert user.first_name == first_name
    assert user.last_name == last_name
    assert user.username == username
    assert user.profile_picture is not None

    user.profile_picture.delete(save=False)
    user.profile_picture = None
    user.save()
    user.refresh_from_db()

    assert not user.profile_picture


@pytest.mark.django_db
def test_user_can_update_data_with_same_username(auth_client, user):
    username = user.username
    first_name = "Arthur update"
    last_name = "Morgan update"
    data = {"username": username, "first_name": first_name, "last_name": last_name}

    _partial_update(auth_client=auth_client, data=data, status_code=HTTP_200_OK)

    user_instance = User.objects.filter(id=user.id).first()
    assert user_instance.first_name == first_name
    assert user_instance.last_name == last_name
    assert user_instance.username == username
