import { writable, derived } from 'svelte/store';
import { APP } from '$lib/constants'

type Menu = {
  args: any;
  type: string;
}

export const menu = writable<Menu>({ 
  args: null, 
  type: APP.MENU 
});

export const open = (type: Menu['type'], args: Menu['args'] = null): void => {
  const types = [
    APP.POPUP,
    APP.POPUP_FILTER,
    APP.POPUP_BORROW,
    APP.POPUP_RETURN,
    APP.MENU
  ];

  if (types.includes(type)) {
    menu.set({ args, type });
  } else {
    console.warn(`Unhandled type: ${type}`);
  }
}

export const close = (type: Menu['type']): void => {
  switch (type) {
    case APP.POPUP_FILTER:
    case APP.POPUP_BORROW:
    case APP.POPUP_RETURN:
      menu.set({ args: null, type: APP.POPUP });
      break;

    case APP.POPUP:
      menu.set({ args: null, type: APP.MENU });
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
