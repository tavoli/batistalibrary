import { writable } from 'svelte/store';

export const notification = writable<string>('');

export const toast = (message: string) => {
  notification.set(message);
  setTimeout(() => notification.set(''), 3000);
};
