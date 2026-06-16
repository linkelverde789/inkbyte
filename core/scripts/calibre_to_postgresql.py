#!/usr/bin/env python3

import sys
from pathlib import Path
import os
import sqlite3
from django.core.files import File

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")

import django

django.setup()

from books.api.serializers import CreateBookSerializer
from books.use_cases.create_book import CreateBookUseCase
from settings.settings import MEDIA_ROOT


LIBRARY = "/home/sergio/Música/Biblioteca de calibre"
DB = os.path.join(LIBRARY, "metadata.db")

MEDIA_ROOT = Path(MEDIA_ROOT)
COVERS_DIR = MEDIA_ROOT / "books"
COVERS_DIR.mkdir(parents=True, exist_ok=True)
from bs4 import BeautifulSoup


def clean_html(html: str) -> str:
    return BeautifulSoup(html or "", "html.parser").get_text()


def main():
    conn = sqlite3.connect(DB)
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            books.id,
            books.title,
            books.path,
            comments.text,
            GROUP_CONCAT(authors.name, ', ') AS authors
        FROM books
        LEFT JOIN books_authors_link ON books.id = books_authors_link.book
        LEFT JOIN authors ON authors.id = books_authors_link.author
        LEFT JOIN comments ON comments.book = books.id
        GROUP BY books.id
    """
    )

    for book_id, title, path, text, authors in cur.fetchall():

        cover_src = os.path.join(LIBRARY, path, "cover.jpg")

        if not os.path.exists(cover_src):
            print(f"Missing cover for book {book_id}: {cover_src}")
            continue

        with open(cover_src, "rb") as f:
            image = File(f, name=os.path.basename(cover_src))

            description = clean_html(text) if text is not None else ""

            serializer = CreateBookSerializer(
                data={
                    "title": title,
                    "description": description,
                    "image": image,
                }
            )

            serializer.is_valid(raise_exception=True)

            CreateBookUseCase().execute(**serializer.validated_data)

    conn.close()


if __name__ == "__main__":
    main()
