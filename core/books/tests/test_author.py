import pytest

from books.models import Author


@pytest.mark.django_db
def test_list_authors(api_client):
    author_names = ["Christie", "King", "Sanderson"]
    for name in author_names:
        Author.objects.create(name=name)

    response = api_client.get("/api/authors/")

    assert response.status_code == 200
    assert response.data["count"] == 3


@pytest.mark.django_db
def test_get_author(api_client):
    author = Author.objects.create(name="Tolkien")

    response = api_client.get(f"/api/authors/{author.id}/")
    assert response.status_code == 200
    assert response.data["name"] == author.name


@pytest.mark.django_db
def test_create_author(auth_client):
    response = auth_client.post(
        path="/api/authors/",
        data={
            "name": "Terry Pratchett",
            "description": "Writer of DiscWorld",
            "image": None,
        },
        format="json",
    )

    assert response.status_code == 201
    author_id = response.data["id"]
    assert Author.objects.filter(id=author_id).exists() == True


@pytest.mark.django_db
def test_update_author(auth_client):
    author = Author.objects.create(name="Isac Asimof")
    response = auth_client.patch(
        path=f"/api/authors/{author.id}/",
        data={"name": "Isaac Asimov", "description": "idk a russian writer"},
        format="json",
    )

    assert response.status_code == 200

    assert Author.objects.filter(id=author.id).first().name == "Isaac Asimov"


@pytest.mark.django_db
def test_delete_author(auth_client):
    author = Author.objects.create(name="Isac Asimof 2 Electric boogaloo")
    response = auth_client.delete(path=f"/api/authors/{author.id}/")
    assert response.status_code == 204
    assert Author.objects.filter(id=author.id).exists() == False
