import type { RequestEvent } from "@sveltejs/kit"

import { APP } from '$lib/constants';

export const load = async (event: RequestEvent) => {
  const session = await event.locals.auth()
	const library = event.cookies.get(APP.LIBRARY);
 
  return {
    session,
    cookies: {
      library
    }
  }
}
