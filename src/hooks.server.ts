import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { APP } from '$lib/constants';
import { handle as authenticationHandle } from './auth';

const authorizationHandle: Handle = async ({ event, resolve }) => {
  const protectedRoutes = [
    /^\/book\/\d+$/,
    /^\/edit\d+$/,
    /^\/post$/,
    /^\/library$/,
    /^\/signup/
  ];

  const isProtectedRoute = protectedRoutes.some(route => route.test(event.url.pathname));

  if (isProtectedRoute) {
    const session = await event.locals.auth();
    const library = event.cookies.get(APP.LIBRARY);

    if (session && !library && event.url.pathname === '/signup') {
      return resolve(event);
    }

    if (!session || !library) {
      throw redirect(303, '/');
    }
  }

  return resolve(event);
}

export const handle = sequence(authenticationHandle, authorizationHandle);
