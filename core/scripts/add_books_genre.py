#!/usr/bin/env python3

import argparse
import csv
import os
from pathlib import Path
import sys


BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")

import django

django.setup()

from books.models import Book
from books.selectors.genre import GenreSelector
from books.use_cases.book.add_genre_to_book import AddGenreToBookUseCase
from books.selectors.book import BookSelector


def parse_args():
    parser = argparse.ArgumentParser(
        description="csv: path to the csv file with the data to load books with genres"
    )
    parser.add_argument(
        "--csv",
        type=str,
        help="path to the csv file with the data to load books with genres",
        required=True,
    )
    return parser.parse_args()


def process_add_genres_to_book(genres: str, book: Book):
    print(f"processing {book.title} with genres: {genres}")
    for genre in genres:
        genre = genre.strip()
        genre_data = GenreSelector().get_genre_by_name(genre)
        if genre_data is None:
            print(f"The genre {genre} do not exists. Skipping")
            continue
        AddGenreToBookUseCase().execute(book_id=book.id, genre_id=genre_data.id)


def main(origin_csv: str) -> int:
    count = 0
    with open(origin_csv, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:

            title = row["title"].strip()

            book = BookSelector.get_book_by_title_exact(title)

            if book is None:
                print(f"The book {title} do not exists. Skipping")
                continue

            genres = row["genres"].split(";")
            process_add_genres_to_book(genres=genres, book=book)
            count += 1

    return count


if __name__ == "__main__":
    args = parse_args()
    processed_result = main(args.csv)
    print(f"Books processed: {processed_result}")
