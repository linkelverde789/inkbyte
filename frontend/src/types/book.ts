export interface BookGenre {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
  description?: string;
}

export interface Book {
  id: number;
  title: string;
  description?: string;
  image: string;
  genre: BookGenre[];
  type: string;
  authors: Author[];
  rating: number;
}

export interface BookListResponse {
  count: number;
  page: number;
  page_size: number;
  results: Book[];
}
