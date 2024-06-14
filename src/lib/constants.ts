import { DATA, ID } from "../client";

export const APP = {
  MENU: 'menu',

  POPUP: 'popup',
  POPUP_BORROW: 'popup.borrow',
  POPUP_RETURN: 'popup.return',
  POPUP_FILTER: 'popup.filter',

  ROUTE_EDIT: '/edit/[id]',
  ROUTE_BOOK: '/book/[id]',
  ROUTE_UPLOAD: '/upload',
  ROUTE_LIST: '/library/list',

  OPTION_BORROW: 'option.borrow',
  OPTION_RETURN: 'option.return',
  OPTION_EDIT: 'option.edit',

  IMAGE: `https://cdn.sanity.io/images/${ID}/${DATA}/[asset].200x200.jpg`
}
