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

export interface Book {
  id: number;
  title: string;
  description?: string;
  image?: string;
  genres?: BookGenre[];
  type?: string;
  authors?: Author[];
  rating?: number;
  format?: string;
}
