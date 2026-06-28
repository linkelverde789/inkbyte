from django.contrib.auth import get_user_model
import pytest
from rest_framework.status import HTTP_201_CREATED

from books.models import Book
from lists.models import List
from events.models import Event, EventType

User = get_user_model()


def assert_event_incremented(event_type: EventType, action, user: User = None):
    filters = {"event_type": event_type}
    if user is not None:
        filters["user_id"] = user.id

    before = Event.objects.filter(**filters).count()

    action()

    after = Event.objects.filter(**filters).count()

    assert after == before + 1


@pytest.mark.django_db
def test_create_event_when_user_login(user, api_client):
    assert_event_incremented(
        EventType.LOGIN,
        lambda: api_client.post(
            "/api/auth/login/",
            data={"email": user.email, "password": "pass1234"},
            format="json",
        ),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_user_logout(user, api_client):
    api_client.force_authenticate(user=user)

    assert_event_incremented(
        EventType.LOGOUT,
        lambda: api_client.post("/api/auth/logout/"),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_user_signup(api_client):
    email = "new_test@inkbyte.com"
    password = "super_secure_password"

    data = {
        "email": email,
        "password": password,
        "password_confirm": password,
        "first_name": "first name",
        "last_name": "last name",
        "username": "user_test",
    }

    response = api_client.post("/api/auth/register/", data=data, format="json")

    assert response.status_code == HTTP_201_CREATED

    assert (
        Event.objects.filter(
            event_type=EventType.SIGNUP,
            user_id=response.data["user"]["id"],
        ).count()
        == 1
    )


@pytest.mark.django_db
def test_create_event_when_view_book(user, api_client):
    api_client.force_authenticate(user=user)
    book = Book.objects.create(title="Some title")

    assert_event_incremented(
        EventType.BOOK_VIEW,
        lambda: api_client.get(f"/api/books/{book.id}/"),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_anonymous_view_book(api_client):
    book = Book.objects.create(title="Some title")

    assert_event_incremented(
        EventType.BOOK_VIEW,
        lambda: api_client.get(f"/api/books/{book.id}/"),
    )


@pytest.mark.django_db
def test_create_event_when_view_search_page(user, api_client):
    api_client.force_authenticate(user=user)

    assert_event_incremented(
        EventType.BOOK_LIST_VIEW,
        lambda: api_client.get("/api/books/"),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_search_books(user, api_client):
    api_client.force_authenticate(user=user)

    assert_event_incremented(
        EventType.BOOK_SEARCH,
        lambda: api_client.get("/api/books/", data={"q": "Some text"}),
        user=user,
    )

    assert_event_incremented(
        EventType.BOOK_SEARCH,
        lambda: api_client.get("/api/books/", data={"author_id": 1}),
        user=user,
    )

    assert_event_incremented(
        EventType.BOOK_SEARCH,
        lambda: api_client.get("/api/books/", data={"genre_id": 1}),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_create_list(user, api_client):
    api_client.force_authenticate(user=user)

    data = {
        "name": "Some list name",
        "description": "Some description",
    }

    assert_event_incremented(
        EventType.LIST_CREATE,
        lambda: api_client.post("/api/lists/", data=data, format="json"),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_update_list(user, api_client):
    api_client.force_authenticate(user=user)

    list_instance = List.objects.create(name="Some name", user=user)

    data = {
        "name": "Some list name",
        "description": "Some description",
    }

    assert_event_incremented(
        EventType.LIST_UPDATE,
        lambda: api_client.patch(
            f"/api/lists/{list_instance.id}/",
            data=data,
            format="json",
        ),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_delete_list(user, api_client):
    api_client.force_authenticate(user=user)

    list_instance = List.objects.create(name="Some name", user=user)

    assert_event_incremented(
        EventType.LIST_DELETE,
        lambda: api_client.delete(f"/api/lists/{list_instance.id}/"),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_view_lists(user, api_client):
    api_client.force_authenticate(user=user)

    assert_event_incremented(
        EventType.LIST_VIEW,
        lambda: api_client.get("/api/lists/", data={"page": 1}, format="json"),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_view_my_lists(user, api_client):
    api_client.force_authenticate(user=user)

    assert_event_incremented(
        EventType.MINE_LIST_VIEW,
        lambda: api_client.get("/api/lists/mine/", data={"page": 1}, format="json"),
        user=user,
    )


@pytest.mark.django_db
def test_create_event_when_rated_book(user, api_client):
    api_client.force_authenticate(user=user)
    book = Book.objects.create(title="Some title")
    assert_event_incremented(
        EventType.BOOK_RATED,
        lambda: api_client.put(
            f"/api/books/{book.id}/rating/", data={"rating": 1}, format="json"
        ),
        user=user,
    )
