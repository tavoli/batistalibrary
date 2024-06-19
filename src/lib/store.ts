import { writable, type Writable, derived, get } from 'svelte/store';
import { APP } from '$lib/constants'

type Menu = {
  type: string;
  options: string[];
  id: any;
}

export type Book = {
  _id: string;
  title: string;
  available: boolean;
  imageUrl: string;
  author: {
    name: string;
  };
  category: {
    name: string;
  };
}

type Library = {
  available: Record<string, Book>;
  borrowed: Record<string, Book>;
  ids: string[];
}

export const menu = writable<Menu>({ 
  type: APP.MENU,
  options: [],
  id: null, 
});

export const library = writable<Library>({ 
  available: {}, 
  borrowed: {},
  ids: [],
});

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

export const open = (args: Menu | Menu['type']): void => {
  const types = [
    APP.POPUP,
    APP.POPUP_FILTER,
    APP.POPUP_BORROW,
    APP.POPUP_RETURN,
    APP.MENU
  ];

  const isValidType = (type: string): boolean => types.includes(type);

  if (typeof args === 'string') {
    if (isValidType(args)) {
      menu.set({ ...get(menu), type: args });
    } else {
      console.warn(`Unhandled type: ${args}`);
    }
  } else if (isValidType(args.type)) {
    menu.set({ ...get(menu), ...args });
  } else {
    console.warn(`Unhandled type: ${args.type}`);
  }
};

export const close = (type: Menu['type']): void => {
  switch (type) {
    case APP.POPUP_FILTER:
    case APP.POPUP_BORROW:
    case APP.POPUP_RETURN:
      menu.set({ ...get(menu), type: APP.POPUP });
      break;
    case APP.POPUP:
      menu.set({ type: APP.MENU, options: [], id: null });
      break;
    default:
      console.warn(`Unhandled type: ${type}`);
  }
}

export const openedPopup = derived(menu, ($m) =>  
  $m.type === APP.POPUP || 
  $m.type === APP.POPUP_FILTER || 
  $m.type === APP.POPUP_BORROW || 
  $m.type === APP.POPUP_RETURN
)

export const openedBorrow = derived(menu, ($m) =>  
  $m.type === APP.POPUP_BORROW
)                                    

export const openedReturn = derived(menu, ($m) =>  
  $m.type === APP.POPUP_RETURN
)

export const openedFilter = derived(menu, ($m) =>  
  $m.type === APP.POPUP_FILTER
)

export const openedMenu = derived(menu, ($m) =>  
  $m.type === APP.MENU
)

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
