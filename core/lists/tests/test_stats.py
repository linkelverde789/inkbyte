import pytest
from books.models import Author, Book, Genre
from users.models import User
from lists.models import List


@pytest.mark.django_db
def test_get_stats_with_one_list(api_client, user):
    api_client.force_authenticate(user=user)

    list_instance = List.objects.create(name="simple list", user=user)

    books = [Book(title=f"Title {i}") for i in range(10)]
    books = Book.objects.bulk_create(books)

    list_instance.books.set(books)

    authors = [Author(name=f"Author: {i}") for i in range(3)]
    authors = Author.objects.bulk_create(authors)
    books[0].authors.add(authors[0])
    books[0].authors.add(authors[1])
    books[1].authors.add(authors[1])
    genres = [Genre(name=f"Genre: {i}") for i in range(3)]
    genres = Genre.objects.bulk_create(genres)
    books[0].genres.add(genres[0])
    books[0].genres.add(genres[1])
    books[1].genres.add(genres[1])
    res = api_client.get("/api/lists/mine/stats/").data

    assert len(res["authors"]) == 2
    assert res["authors"][0]["name"] == "Author: 1"
    assert res["authors"][1]["value"] == 1

    assert len(res["genres"]) == 2
    assert res["genres"][0]["name"] == "Genre: 1"
    assert res["genres"][1]["value"] == 1


@pytest.mark.django_db
def test_get_stats_with_multiple_lists(api_client, user):
    api_client.force_authenticate(user=user)

    list1 = List.objects.create(name="List 1", user=user)

    books1 = Book.objects.bulk_create([Book(title=f"Title {i}") for i in range(10)])
    list1.books.set(books1)

    authors = Author.objects.bulk_create(
        [Author(name=f"Author: {i}") for i in range(3)]
    )

    books1[0].authors.add(authors[0], authors[1])
    books1[1].authors.add(authors[1])

    genres = Genre.objects.bulk_create([Genre(name=f"Genre: {i}") for i in range(3)])

    books1[0].genres.add(genres[0], genres[1])
    books1[1].genres.add(genres[1])

    list2 = List.objects.create(name="List 2", user=user)

    books2 = Book.objects.bulk_create(
        [Book(title=f"Other title {i}") for i in range(2)]
    )
    list2.books.set(books2)

    books2[0].authors.add(authors[1])
    books2[1].authors.add(authors[2])

    books2[0].genres.add(genres[1])
    books2[1].genres.add(genres[2])

    res = api_client.get("/api/lists/mine/stats/").data

    assert res["authors"] == [
        {"name": "Author: 1", "value": 3},
        {"name": "Author: 0", "value": 1},
        {"name": "Author: 2", "value": 1},
    ]

    assert res["genres"] == [
        {"name": "Genre: 1", "value": 3},
        {"name": "Genre: 0", "value": 1},
        {"name": "Genre: 2", "value": 1},
    ]


@pytest.mark.django_db
def test_get_stats_from_other_user(api_client, user):
    user2 = User.objects.create_user(
        username="testuser2",
        email="test2@test.com",
        password="pass12345",
    )

    api_client.force_authenticate(user=user2)

    list_instance = List.objects.create(name="simple list", user=user)

    books = [Book(title=f"Title {i}") for i in range(10)]
    books = Book.objects.bulk_create(books)

    list_instance.books.set(books)

    authors = [Author(name=f"Author: {i}") for i in range(3)]
    authors = Author.objects.bulk_create(authors)
    books[0].authors.add(authors[0])
    books[0].authors.add(authors[1])
    books[1].authors.add(authors[1])
    genres = [Genre(name=f"Genre: {i}") for i in range(3)]
    genres = Genre.objects.bulk_create(genres)
    books[0].genres.add(genres[0])
    books[0].genres.add(genres[1])
    books[1].genres.add(genres[1])
    res = api_client.get("/api/lists/mine/stats/").data

    assert len(res["genres"]) == 0
    assert len(res["authors"]) == 0
