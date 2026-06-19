import { api } from "@/api";
import { API_ENDPOINTS, RELATED_SHELF_ENDPOINTS } from "@/api/endpoints";
import { Book } from "@/types/book";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  icon: any;
  endpoint: keyof typeof RELATED_SHELF_ENDPOINTS;
  id?: number;
};
export function RelatedShelf(props: Props) {
  const [result, setResult] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!props.id) return;
        const url = RELATED_SHELF_ENDPOINTS[props.endpoint];
        const response = await api.get<any>(url(props.id), {
          params: { page_size: 8, page: 1, id: props.id },
        });

        console.log(response);

        setResult(response.results);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [props.endpoint]);

  return (
    <section className="mt-20 border-t border-border pt-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {props.icon} {props.subtitle}
          </p>
          <h2 className="mt-2 text-4xl">{props.title}</h2>
        </div>
      </div>
      {result.length === 0 ? (
        <div className="border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
          {"SIN NADA"}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {result.map((book) => (
            <Link
              key={book.id}
              to="/books/$id"
              params={{ id: book.id.toString() }}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted shadow-[6px_6px_0_var(--color-secondary)] transition-transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_var(--color-primary)]">
                <img
                  src={book.image}
                  alt={`Portada de ${book.title}`}
                  className={`h-full w-full max-w-none object-cover ${book.image === "center" ? "-translate-x-1/3" : book.image === "right" ? "-translate-x-2/3" : ""}`}
                />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">
                {book.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <p className="mt-1 text-lg leading-tight">{book.title}</p>
              <p className="text-sm italic text-muted-foreground">
                {book.authors?.map((author) => author.name).join(", ")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
