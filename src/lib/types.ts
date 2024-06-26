export type Menu = {
  type: string;
  options: string[];
  id: any;
}

export type Book = {
  _id: string;
  isbn: string;
  title: string;
  pages: number;
  author: {
    _id: string;
    name: string;
  };
  date_published: string;
  description: string;
  available: boolean;
  categories: {
    _id: string;
    name: string;
  }[];
  imageUrl: string;
}

export type Library = {
  available: Record<string, Book>;
  borrowed: Record<string, Book>;
  ids: string[];
}

export type Category = {
  _id: string;
  name: string;
}

export type Author = {
  _id: string;
  name: string;
}

export type CategoryStore = {
  ids: string[];
  category: Record<string, Category>;
}

export type AuthorStore = {
  ids: string[];
  author: Record<string, Author>;
}

export type QueryFilter = {
  query: string;
  ids: string[];
}
