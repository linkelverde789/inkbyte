import { Book } from "./book";

export type List = {
  id: number | string;
  name: string;
  description: string | null;
  cover: string | null;
  books: Book[];
};

export type ListResponse = {
  results: List[];
  count: number;
  page: number;
  page_size: number;
};
