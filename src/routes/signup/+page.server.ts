import { type RequestEvent } from '@sveltejs/kit';

import { APP } from '$lib/constants';

const setCookie = async ({ request, cookies }: RequestEvent) => {
    const formData = await request.formData();
    const cookieValue = formData.get('library');

    if (typeof cookieValue === 'string') {
        cookies.set(APP.LIBRARY, cookieValue, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        });
    }

    return {
        success: true
    };
};

export const actions = { 
  default: setCookie,
};
