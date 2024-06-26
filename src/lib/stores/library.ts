import { writable, derived, get } from 'svelte/store';

import type { Library, Book } from '$lib/types';
import { categorizeBooks, filterBookList, getOptions, getValueAtPath } from '$lib/helpers';
import { queryFilter, isFiltering } from '$lib/stores/queryFilter';
import { APP } from '$lib/constants';
import { categoryStore } from '$lib/stores/category';

export const library = writable<Library>({
  available: {},
  borrowed: {},
  ids: [],
});

export function getBook(id: string, path = ''): Book | null {
  const book = get(library).available[id] ?? get(library).borrowed[id];
  if (!book) return null;
  return path ? getValueAtPath(book, path) : book;
}

export function isAvailableBook(id: string) {
  return Boolean(get(library).available[id]);
}

export function isBorrowedBook(id: string) {
  return Boolean(get(library).borrowed[id]);
}

export const availableBooks = derived(library, $library => {
  return filterBookList(
    $library.ids,
    isAvailableBook,
    () => [APP.OPTION_BORROW, APP.OPTION_EDIT]
  );
});

export const borrowedBooks = derived(library, $library => {
  return filterBookList(
    $library.ids,
    isBorrowedBook,
    () => [APP.OPTION_RETURN, APP.OPTION_EDIT]
  );
});

export const filteredBooks = derived(
  [queryFilter, isFiltering],
  ([$queryFilter, $isFiltering]) => {
    if ($isFiltering) {
      return filterBookList($queryFilter.ids, () => true, getOptions);
    } else {
      return [];
    }
  }
);

export function borrowBook(id: string) {
  library.update(cur => {
    if (cur.available[id]) {
      cur.borrowed[id] = cur.available[id];
      cur.borrowed[id].available = false;
      delete cur.available[id];
    }
    return cur;
  });
}

export function returnBook(id: string) {
  library.update(cur => {
    if (cur.borrowed[id]) {
      cur.available[id] = cur.borrowed[id];
      cur.available[id].available = true;
      delete cur.borrowed[id];
    }
    return cur;
  });
}

export function updateLibraryStore(books: Book[] = []) {
  const { available, borrowed, ids } = categorizeBooks(books)

  library.set({ 
    available, 
    borrowed,
    ids
  })
}

export function updateBookStore(book: Book) {
  library.update(cur => {
    if (book.available) {
      delete cur.borrowed[book._id];
      cur.available[book._id] = book;
      return cur;
    } else {
      delete cur.available[book._id];
      cur.borrowed[book._id] = book;
      return cur;
    }
  });
}

export function addBookStore(book: Book) {
  library.update(cur => {
    cur.ids.push(book._id);
    if (book.available) {
      cur.available[book._id] = book;
    } else {
      cur.borrowed[book._id] = book;
    }
    return cur;
  });
}

export function filterBooksByCategory(name: string): string[] {
  const ids = get(library).ids;
  if (!name) return ids;

  return ids.filter(id => {
    const book = getBook(id);
    if (!book) return false;

    return book.categories.some(
      id => get(categoryStore).category[id]?.name === name
    );
  });
}
