from django.db import models



# =========================
# Author
# =========================
class Author(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


# =========================
# Book Series
# =========================
class Series(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


# =========================
# Book Type (choices)
# =========================
class Type(models.TextChoices):
    EBOOK = "ebook", "Ebook"
    HARDCOVER = "hardcover", "Hardcover"
    PAPERBACK = "paperback", "Paperback"


# =========================
# Book
# =========================
class Book(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='books/', null=True, blank=True)

    series = models.ManyToManyField(
        Series,
        through="SeriesMembership",
        related_name="books",
        blank=True
    )

    type = models.CharField(
        max_length=20,
        choices=Type.choices
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


class SeriesMembership(models.Model):
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="series_memberships"
    )

    series = models.ForeignKey(
        Series,
        on_delete=models.CASCADE,
        related_name="book_memberships"
    )

    index = models.PositiveIntegerField()

    class Meta:
        unique_together = ("book", "series")

        ordering = ["series", "index"]

    def __str__(self):
        return f"{self.series.name} - {self.book.title} ({self.index})"


# =========================
# Book File
# =========================
class File(models.Model):
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="files"
    )

    file = models.FileField(upload_to='books/files/')

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]