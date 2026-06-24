export type List = {
  id: number | string;
  name: string;
  description: string | null;
  cover: string | null;
  bookCount: number;
};

export type ListResponse = {
  results: List[];
  count: number;
  page: number;
  page_size: number;
};
