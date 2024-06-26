import { writable } from 'svelte/store';

import type { CategoryStore, Category } from '$lib/types';

export const categoryStore = writable<CategoryStore>({
  ids: [],
  category: {},
});

export function updateCategoryStore(categories: Category[] = []) {
  const category: Record<string, Category> = {};
  const ids: string[] = [];

  for (const c of categories) {
    ids.push(c._id);
    category[c._id] = c;
  }

  categoryStore.set({
    category,
    ids
  });
}
