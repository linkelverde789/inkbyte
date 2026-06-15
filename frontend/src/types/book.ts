export interface Book {
    id: number;
    slug: string;
    title: string;
    author: string;
    description: string;
    genre: string;
    type: string;
    year: number;
    rating: number;
    format: string[];
    cover: string;
  }
  
  export interface BookListResponse {
    count: number;
    page: number;
    page_size: number;
    results: Book[];
  }