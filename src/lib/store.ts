import { writable } from 'svelte/store';

export const menu = writable(true);

export const popup = writable(false);

export const open = (type: string, value: any = true) => {
  if (type === 'popup') {
    popup.set(value);
    menu.set(false);
  } else if (type === 'menu') {
    menu.set(value);
    popup.set(false);
  } else {
    throw new Error('Unknown type');
  }
}
