from django.db import models



# =========================
# Author
# =========================
class Author(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='authors/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


# =========================
# Genre
# =========================
class Genre(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


# =========================
# Book Series
# =========================
class BookSeries(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


# =========================
# Book Type (choices)
# =========================
class BookType(models.TextChoices):
    EBOOK = "ebook", "Ebook"
    HARDCOVER = "hardcover", "Hardcover"
    PAPERBACK = "paperback", "Paperback"


# =========================
# Book
# =========================
class Book(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='books/', null=True, blank=True)

    series = models.ForeignKey(
        BookSeries,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="books"
    )

    type = models.CharField(
        max_length=20,
        choices=BookType.choices
    )

    authors = models.ManyToManyField(
        Author,
        related_name="books",
        blank=True
    )

    genres = models.ManyToManyField(
        Genre,
        related_name="books",
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


# =========================
# Book File
# =========================
class BookFile(models.Model):
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="files"
    )

    file = models.FileField(upload_to='books/files/')

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]