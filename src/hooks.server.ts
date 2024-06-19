import { AUTH_TOKEN } from '$lib/utils/constants';
import { redirect } from '@sveltejs/kit';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.url.endsWith('login')) {
		return await resolve(event);
	}
	const dushAuth = event.cookies.get(AUTH_TOKEN);
	if (!dushAuth) {
		return redirect(301, '/login');
	}
	return await resolve(event);
};
