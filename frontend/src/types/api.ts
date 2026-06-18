import { Book } from "./book";

export interface BookListResponse {
  count: number;
  page: number;
  page_size: number;
  results: Book[];
}

export interface PaginationParams {
  page: number;
  page_size: number;
}

export interface BookSearchParams extends PaginationParams {
  q?: string;
  genres?: number[];
  authors?: number[];
  format?: string[];
  type?: string[];
}
