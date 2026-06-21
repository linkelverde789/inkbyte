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
  description: string;
  index: number;
}

export interface BookFile {
  id: number;
  file: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  genres: BookGenre[];
  authors: Author[];
  rating: number;
  series: BookSeries[];
  files: BookFile[];
  type?: string;
}
