export interface BookGenre {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  genre: BookGenre[];
  type: string;
  author: string;
}

export interface BookListResponse {
  count: number;
  page: number;
  page_size: number;
  results: Book[];
}
