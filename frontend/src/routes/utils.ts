import { TranslateFn } from "@/i18n/i18nProvider";
import { Author, BookGenre } from "@/types/book";

export default function sleep(s: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}

export function getExtension(file: string) {
  let result = file.substring(file.lastIndexOf(".") + 1).toUpperCase();
  return result;
}

export function showAuthors(authors: Author[]): string {
  return authors.map((author) => author.name).join(", ");
}
export function showGenres(genres: BookGenre[]): string {
  return genres.map((genre) => genre.name).join(", ");
}

export function timeAgo(dateString: string, t: TranslateFn) {
  const diffMs = Date.now() - new Date(dateString).getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return t("time_seconds_ago", { value: seconds });

  if (minutes < 60) return t("time_minutes_ago", { value: minutes });

  if (hours < 24) return t("time_hours_ago", { value: hours });

  return t("time_days_ago", { value: days });
}
