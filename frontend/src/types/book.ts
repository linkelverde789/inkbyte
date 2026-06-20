export interface BookGenre {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

export interface BookSeries {
  id: number;
  name: string;
  description: string | undefined;
  index: number;
}

export interface Book {
  id: number;
  title: string;
  description: string | undefined;
  image: string | undefined;
  genres: BookGenre[] | undefined;
  authors: Author[];
  type?: string;
  rating?: number;
  format?: string;
  series?: BookSeries[];
}
