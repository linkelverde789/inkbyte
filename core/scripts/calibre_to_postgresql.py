#!/usr/bin/env python3

import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

import os
import django

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "settings.settings"
)

django.setup()
import shutil
import sqlite3

from books.api.serializers import CreateBookSerializer
from books.use_cases.create_book import CreateBookUseCase
from settings.settings import MEDIA_ROOT
from django.core.files import File

LIBRARY = "/home/sergio/Música/Biblioteca de calibre"
DB = os.path.join(LIBRARY, "metadata.db")


COVERS_DIR = MEDIA_ROOT / "books"
COVERS_DIR.mkdir(parents=True, exist_ok=True)


conn = sqlite3.connect(DB)
cur = conn.cursor()

cur.execute("""
SELECT
    books.id,
    books.title,
    books.path,
    GROUP_CONCAT(authors.name, ', ') AS authors
from books
LEFT JOIN books_authors_link ON books.id = books_authors_link.book
LEFT JOIN authors ON authors.id = books_authors_link.author
GROUP BY books.id
""")

for row in cur.fetchall():
    book_id, title, path, authors = row
    print("BOOK ID: %s", book_id)

    description = "ignore"

    cover_src = os.path.join(LIBRARY, path, "cover.jpg")
    cover_dst = COVERS_DIR / f"{book_id}.jpg"

    image = File(open(cover_src, "rb"), name=os.path.basename(cover_src))

    serializer = CreateBookSerializer(data={
        "title": title,
        "description": description,
        "image": image,
    })

    serializer.is_valid(raise_exception=True)

    CreateBookUseCase().execute(**serializer.validated_data)


conn.close()