import { writable, get, type Writable } from 'svelte/store';

function createSetStore<T>(initialValue: T[] = []) {
  const _set: Writable<Set<T>> = writable(new Set(initialValue));

  return {
    ..._set,
    add: (value: T) => _set.update(old => {
      const newSet = new Set(old);
      newSet.add(value);
      return newSet;
    }),
    size: () => get(_set).size,
    clear: () => _set.set(new Set()),
    has: (value: T) => get(_set).has(value),
  };
}

export const NewSet = createSetStore;
