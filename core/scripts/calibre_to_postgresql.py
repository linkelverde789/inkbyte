#!/usr/bin/env python3

import sys
from pathlib import Path
import os
import sqlite3
from typing import List
from django.core.files import File

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")

import django

django.setup()

from settings.settings import MEDIA_ROOT
from books.api.serializers import CreateBookSerializer
from books.models import Author
from books.selectors.author import AuthorSelector
from books.use_cases.author.create_author import CreateAuthorUseCase
from books.use_cases.book.create_book import CreateBookUseCase

LIBRARY = "/home/sergio/Música/Biblioteca de calibre"
DB = os.path.join(LIBRARY, "metadata.db")

MEDIA_ROOT = Path(MEDIA_ROOT)
COVERS_DIR = MEDIA_ROOT / "books"
COVERS_DIR.mkdir(parents=True, exist_ok=True)
from bs4 import BeautifulSoup


def clean_html(html: str) -> str:
    return BeautifulSoup(html or "", "html.parser").get_text()

def process_author(author_names: str) -> List[int]:
    result: List[int] = []

    for author_name in author_names.split(","):
        name = author_name.strip()

        author = AuthorSelector.get_author_by_name(name)
        if author is None:
            author = CreateAuthorUseCase().execute(
                name=name,
                description=None,
                image=None
            )

        result.append(author.id)

    return result


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

    for book_id, title, path, text, author_names in cur.fetchall():
        author = process_author(author_names)

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
                    "author_ids": author
                }
            )

            serializer.is_valid(raise_exception=True)

            print("siempre arriba con un flow espacial %s", serializer.validated_data)

            CreateBookUseCase().execute(**serializer.validated_data)
        
    conn.close()


if __name__ == "__main__":
    main()
