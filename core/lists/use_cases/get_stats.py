from django.contrib.auth import get_user_model
from lists.dto import ListStats
from lists.selectors import ListSelector

User = get_user_model()


class GetStatsUseCase:
    def execute(self, user: User) -> ListStats:
        genres_stats = ListSelector().get_genre_stats(user=user)
        authors_stats = ListSelector().get_author_stats(user=user)
        books_count = ListSelector().get_book_count(user=user)
        return ListStats(
            genres=genres_stats, authors=authors_stats, books_count=books_count
        )
