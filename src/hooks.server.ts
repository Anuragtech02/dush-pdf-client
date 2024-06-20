import { authMiddleware } from '$lib/api/config';
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

	const { isAuthorized, user } = await authMiddleware(event.cookies);

	if (!isAuthorized) {
		return redirect(301, '/login');
	}

	// @ts-expect-error - add user to locals
	event.locals.user = user;

	return await resolve(event);
};
