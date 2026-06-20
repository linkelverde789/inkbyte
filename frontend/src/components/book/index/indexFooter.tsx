import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { Link } from "@tanstack/react-router";
import readingNook from "@/assets/reading-nook.jpg";
import { MainFooter } from "./mainFooter";

export function Footer() {
  const { t } = useI18n();

  return (
    <>
      <section id="comunidad" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-12">
          <div className="col-span-12 flex flex-col justify-center p-8 sm:p-12 md:col-span-6 md:p-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {t("A library that feels more yours")}
            </p>
            <h2 className="mb-7 text-4xl leading-tight sm:text-5xl">
              {t("Save, organize and return to your readings.")}
            </h2>
            <p className="mb-9 max-w-lg text-base leading-relaxed text-primary-foreground/80">
              {t(
                "Create shelves, keep your download history and receive recommendations based on what you truly enjoy reading.",
              )}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Button variant="editorialLight" size="editorial" asChild>
                <Link to="/signup">{t("Create account")}</Link>
              </Button>
              <span className="text-xs font-bold uppercase tracking-widest">
                {t("No subscription")}
              </span>
            </div>
          </div>
          <img
            src={readingNook}
            width={1024}
            height={1024}
            loading="lazy"
            alt="Rincón de lectura cálido con libro y lector electrónico"
            className="col-span-12 h-full min-h-80 w-full object-cover md:col-span-6"
          />
        </div>
      </section>
      <MainFooter />
    </>
  );
}
