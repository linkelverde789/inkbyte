import { Book } from "./book";

export interface BaseListResponse {
  count: number;
  page: number;
  page_size: number;
}

export interface DataResult {
  id: number;
  name: string;
}

export interface BaseDataResponse {
  results: DataResult[];
}

export interface BookListResponse extends BaseListResponse {
  results: Book[];
}

export interface PaginationParams {
  page: number;
  page_size: number;
}

export interface BookSearchParams extends PaginationParams {
  q?: string;
  genre_id?: number | undefined;
  author_id?: number | undefined;
  format?: string;
  type?: string;
}
