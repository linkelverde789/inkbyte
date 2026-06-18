#!/usr/bin/env python3

import argparse
import os
import sys
import sqlite3
from pathlib import Path

from bs4 import BeautifulSoup
from django.core.files import File

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")

import django

django.setup()
from books.api.serializers import CreateBookSerializer
from books.models import Book
from books.selectors.author import AuthorSelector
from books.selectors.series import SeriesSelector
from books.use_cases.author.create_author import CreateAuthorUseCase
from books.use_cases.book.create_book import CreateBookUseCase
from books.use_cases.book.add_book_to_series import AddBookToSeriesUseCase
from books.use_cases.series.create_series import CreateSeriesUseCase


def parse_args():
    parser = argparse.ArgumentParser(
        description="path: path to the calibre metadata database"
    )
    parser.add_argument(
        "--path",
        type=str,
        help="Path to the Calibre metadata database",
        required=True,
    )

    parser.add_argument(
        "--database",
        type=str,
        help="The Calibre metadata database",
        required=True,
    )
    return parser.parse_args()


def clean_html(html: str) -> str:
    return BeautifulSoup(html or "", "html.parser").get_text()


def process_author(author_names: str) -> list[int]:
    authors_ids: list[int] = []

    for name in author_names.split(","):
        name = name.strip()
        if not name:
            continue

        author = AuthorSelector.get_author_by_name(name)

        if author is None:
            author = CreateAuthorUseCase().execute(
                name=name,
                description=None,
                image=None,
            )

        authors_ids.append(author.id)

    return authors_ids


def process_image(path: str, metadata: str) -> File | None:
    cover_path = os.path.join(metadata, path, "cover.jpg")

    if not os.path.exists(cover_path):
        return None

    file = open(cover_path, "rb")
    return File(file, name=os.path.basename(cover_path))


def process_book(
    title: str,
    description: str | None,
    image: File | None,
    author_ids: list[int],
) -> Book:
    serializer = CreateBookSerializer(
        data={
            "title": title,
            "description": description if description is not None else "",
            "image": image,
            "author_ids": author_ids,
        }
    )

    serializer.is_valid(raise_exception=True)

    return CreateBookUseCase().execute(**serializer.validated_data)


def process_series(book: Book, series_name: str, series_index):
    series = SeriesSelector.get_one_series_by_name(series_name)

    if series is None:
        series = CreateSeriesUseCase().execute(name=series_name)

    print(f"Series: {series.name} created")

    AddBookToSeriesUseCase().execute(
        book_id=book.id, series_id=series.id, index=series_index
    )


def main(database_path: str, database: str) -> None:
    conn = sqlite3.connect(f"{database_path}/{database}")
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
  books.title,
  books.path,
  comments.text,
  GROUP_CONCAT(authors.name, ', ') AS authors,
  series.name,
  books.series_index
FROM
  books
  LEFT JOIN books_authors_link ON books.id = books_authors_link.book
  LEFT JOIN authors ON authors.id = books_authors_link.author
  LEFT JOIN comments ON comments.book = books.id
  LEFT JOIN books_series_link ON books.id = books_series_link.book
  LEFT JOIN series ON series.id = books_series_link.series
GROUP BY
  books.id
        """
    )

    for row in cur.fetchall():
        title, path, text, author_names, series_name, series_index = row

        author_ids = process_author(author_names or "")

        image = process_image(path, database_path)
        description = clean_html(text) if text else None

        book = process_book(
            title=title,
            description=description,
            image=image,
            author_ids=author_ids,
        )
        print(f"Book {book.title} created")
        if series_name is not None:
            process_series(book, series_name, series_index)

    conn.close()


if __name__ == "__main__":
    args = parse_args()
    main(args.path, args.database)
