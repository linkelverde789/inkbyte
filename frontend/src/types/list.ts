import { Book } from "./book";

export type List = {
  id: number | string;
  name: string;
  description: string | null;
  cover: string | null;
  books: Book[];
  updated_at: string;
};

export type ListResponse = {
  results: List[];
  count: number;
  page: number;
  page_size: number;
};

export type ListForm = {
  id?: number | string;
  name: string;
  description: string;
  cover: string;
};
