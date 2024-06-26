import { writable } from 'svelte/store';

import type { AuthorStore, Author } from '$lib/types';

export const authorStore = writable<AuthorStore>({
  ids: [],
  author: {},
});

export function updateAuthorStore(authors: Author[] = []) {
  const author: Record<string, Author> = {};
  const ids: string[] = [];

  for (const a of authors) {
    ids.push(a._id);
    author[a._id] = a;
  }

  authorStore.set({
    author,
    ids
  });
}
