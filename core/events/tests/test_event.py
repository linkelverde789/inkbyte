import pytest
from rest_framework.status import HTTP_201_CREATED

from books.models import Book
from events.models import Event, EventType


@pytest.mark.django_db
def test_create_event_when_user_login(user, api_client):
    assert (
        Event.objects.filter(event_type=EventType.LOGIN, user_id=user.id).count() == 0
    )
    api_client.post(
        path="/api/auth/login/",
        data={"email": user.email, "password": "pass1234"},
        format="json",
    )
    assert (
        Event.objects.filter(event_type=EventType.LOGIN, user_id=user.id).count() == 1
    )


@pytest.mark.django_db
def test_create_event_when_user_logout(user, api_client):
    assert (
        Event.objects.filter(event_type=EventType.LOGOUT, user_id=user.id).count() == 0
    )
    api_client.force_authenticate(user=user)
    api_client.post(
        path="/api/auth/logout/",
    )
    assert (
        Event.objects.filter(event_type=EventType.LOGOUT, user_id=user.id).count() == 1
    )


@pytest.mark.django_db
def test_create_event_when_user_signup(api_client):

    assert Event.objects.filter(event_type=EventType.SIGNUP).count() == 0

    email = "new_test@inkbyte.com"
    password = "super_secure_password"
    first_name = "first name"
    last_name = "last name"
    username = "user_test"

    data = {
        "email": email,
        "password": password,
        "password_confirm": password,
        "first_name": first_name,
        "last_name": last_name,
        "username": username,
    }

    response = api_client.post("/api/auth/register/", data=data, format="json")

    assert response.status_code == HTTP_201_CREATED

    assert (
        Event.objects.filter(
            event_type=EventType.SIGNUP, user_id=response.data["user"]["id"]
        ).count()
        == 1
    )


@pytest.mark.django_db
def test_create_event_when_view_book(user, api_client):

    assert (
        Event.objects.filter(event_type=EventType.BOOK_VIEW, user_id=user.id).count()
        == 0
    )

    api_client.force_authenticate(user=user)

    book = Book.objects.create(title="Some title")
    api_client.get(f"/api/books/{book.id}/")
    assert (
        Event.objects.filter(event_type=EventType.BOOK_VIEW, user_id=user.id).count()
        == 1
    )


@pytest.mark.django_db
def test_create_event_when_anonymous_view_book(api_client):
    assert Event.objects.filter(event_type=EventType.BOOK_VIEW).count() == 0

    book = Book.objects.create(title="Some title")
    api_client.get(f"/api/books/{book.id}/")
    assert Event.objects.filter(event_type=EventType.BOOK_VIEW).count() == 1


@pytest.mark.django_db
def test_create_event_when_view_search_page(user, api_client):
    assert (
        Event.objects.filter(
            event_type=EventType.BOOK_LIST_VIEW, user_id=user.id
        ).count()
        == 0
    )

    api_client.force_authenticate(user=user)

    api_client.get("/api/books/")

    assert (
        Event.objects.filter(
            event_type=EventType.BOOK_LIST_VIEW, user_id=user.id
        ).count()
        == 1
    )


@pytest.mark.django_db
def test_create_event_when_search_books(user, api_client):
    assert (
        Event.objects.filter(event_type=EventType.BOOK_SEARCH, user_id=user.id).count()
        == 0
    )
    api_client.force_authenticate(user=user)

    api_client.get("/api/books/", data={"q": "Some text"})

    assert (
        Event.objects.filter(event_type=EventType.BOOK_SEARCH, user_id=user.id).count()
        == 1
    )

    api_client.get("/api/books/", data={"author_id": 1})

    assert (
        Event.objects.filter(event_type=EventType.BOOK_SEARCH, user_id=user.id).count()
        == 2
    )

    api_client.get("/api/books/", data={"genre_id": 1})

    assert (
        Event.objects.filter(event_type=EventType.BOOK_SEARCH, user_id=user.id).count()
        == 3
    )
