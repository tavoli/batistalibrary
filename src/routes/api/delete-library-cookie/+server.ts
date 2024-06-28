import { type RequestHandler } from '@sveltejs/kit';
import { APP } from '$lib/constants';

export function GET({ cookies }: RequestHandler) {
  cookies.delete(APP.LIBRARY, {
    path: '/'
  });

	return new Response();
}
