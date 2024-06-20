import { authMiddleware } from '$lib/api/config';
import { AUTH_TOKEN, EPermissions, RoutePermissions } from '$lib/utils/constants';
import { redirect } from '@sveltejs/kit';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.url.endsWith('login')) {
		return await resolve(event);
	}

	const baseRedirect = !event.request.url.includes('login') ? event.request.url : '';

	const redirectUrl = baseRedirect ? `/login?redirect=${baseRedirect}` : '/login';

	const dushAuth = event.cookies.get(AUTH_TOKEN);
	if (!dushAuth) {
		return redirect(301, redirectUrl);
	}

	const { isAuthorized, user } = await authMiddleware(event.cookies);

	if (!isAuthorized) {
		return redirect(301, redirectUrl);
	}

	// @ts-expect-error - add user to locals
	event.locals.user = user;
	const requestMethod = event.request.method;
	const dushRoles: Array<{
		attributes: {
			permission: EPermissions;
		};
	}> = user.attributes.dush_roles.data;
	let hasPermission = false;
	if (requestMethod === 'GET') {
		hasPermission = dushRoles.some((role) => role.attributes.permission === EPermissions.READ);
	}

	RoutePermissions.forEach((route) => {
		if (event.request.url.includes(route.url) && route.method === requestMethod) {
			hasPermission = dushRoles.some((role) =>
				route.permissions.includes(role.attributes.permission)
			);
		}
	});

	if (!hasPermission) {
		console.log('User not authorized for ', {
			method: requestMethod,
			url: event.request.url
		});
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401
		});
	}
	return await resolve(event);
};
