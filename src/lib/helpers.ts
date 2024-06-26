import type { Book } from '$lib/types';
import { APP } from '$lib/constants';
import { isAvailableBook, getBook } from '$lib/stores/library';

export function getOptions(id: string) {
  return isAvailableBook(id) 
    ? [APP.OPTION_BORROW, APP.OPTION_EDIT] 
    : [APP.OPTION_RETURN, APP.OPTION_EDIT];
}

export function getValueAtPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export const getImage = (book: Book) => {
  const defaultImage = 'https://placehold.co/200?text=sem foto';
  return book?.imageUrl ? `${book.imageUrl}?w=200&h=200&fit=min&fm=webp` : defaultImage;
};

export function filterBookList(
  bookIds: string[],
  conditionFn: (id: string) => boolean,
  optionsFn: (id: string) => string[]
) {
  return bookIds
    .filter(conditionFn)
    .map(id => ({
      id,
      imageUrl: getImage(getBook(id)),
      title: getBook(id, 'title'),
      author: getBook(id, 'author'),
      options: optionsFn(id)
    }));
}

export function categorizeBooks(books: Book[]) {
  const available: Record<string, Book> = {}
  const borrowed: Record<string, Book> = {}
  const ids: string[] = []

  for (const book of books) {
    ids.push(book._id)
    if (book.available) {
      available[book._id] = book
    } else {
      borrowed[book._id] = book
    }
  }

  return { available, borrowed, ids }
}
