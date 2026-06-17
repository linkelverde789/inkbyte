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
from books.models import Genre


def parse_args():
    parser = argparse.ArgumentParser(
        description="csv_file_path: path to the csv file with the data to load genres"
    )
    parser.add_argument(
        "--csv",
        type=str,
        help="path to the csv file with the data to add genres",
        required=True,
    )
    return parser.parse_args()


def main(origin_csv: str):

    genres = []
    seen = set()
    with open(origin_csv, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        existing = set(Genre.objects.values_list("name", flat=True))
        for row in reader:
            raw_genre = row["genre"].strip()
            if raw_genre not in existing and raw_genre not in seen:
                genres.append(Genre(name=raw_genre))
                seen.add(raw_genre)

    print(len(genres))
    Genre.objects.bulk_create(genres, batch_size=100)


if __name__ == "__main__":
    args = parse_args()
    main(args.csv)
