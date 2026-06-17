#!/usr/bin/env python3

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

origin_csv = "/home/sergio/genre.csv"

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
