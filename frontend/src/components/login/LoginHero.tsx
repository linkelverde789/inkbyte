import { useI18n } from "@/i18n/i18nProvider";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";

export function LoginHero() {
  const { t } = useI18n();

  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft className="size-4" /> InkByte
      </Link>
      <div className="my-16 max-w-lg">
        <BookOpen className="mb-8 size-10 text-secondary" />
        <h1 className="text-5xl leading-tight sm:text-6xl">
          {t("Welcome back to your next readings.")}
        </h1>
        <p className="mt-6 text-primary-foreground/80">
          {t("Your personal space to discover and download stories.")}
        </p>
      </div>
      <p className="text-xs uppercase tracking-widest">
        {t("Read more. Search less.")}
      </p>
    </>
  );
}
