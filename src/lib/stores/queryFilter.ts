import { writable, derived } from 'svelte/store';
import type { QueryFilter } from '$lib/types';

export const queryFilter = writable<QueryFilter>({ query: '', ids: [] });

export const clearFilter = () => {
  queryFilter.set({ query: '', ids: [] });
}

export const queryNotFound = derived(queryFilter, ($f) => $f.ids.length === 0 && $f.query.length > 0);

export const isFiltering = derived(queryFilter, ($f) => $f.query.length > 0 || $f.ids.length > 0);
