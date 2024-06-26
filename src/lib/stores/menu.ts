import { writable, derived, get } from 'svelte/store';
import { APP } from '$lib/constants';
import type { Menu } from '$lib/types';

export const menu = writable<Menu>({
  type: APP.MENU,
  options: [],
  id: null,
});

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

export const openedPopup = derived(menu, ($m: Menu) =>  
  $m.type === APP.POPUP || 
  $m.type === APP.POPUP_FILTER || 
  $m.type === APP.POPUP_BORROW || 
  $m.type === APP.POPUP_RETURN
)

export const openedBorrow = derived(menu, ($m: Menu) =>  
  $m.type === APP.POPUP_BORROW
)                                    

export const openedReturn = derived(menu, ($m: Menu) =>  
  $m.type === APP.POPUP_RETURN
)

export const openedFilter = derived(menu, ($m: Menu) =>  
  $m.type === APP.POPUP_FILTER
)

export const openedMenu = derived(menu, ($m: Menu) =>  
  $m.type === APP.MENU
)
