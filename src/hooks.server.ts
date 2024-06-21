import { authMiddleware } from '$lib/api/config';
import { AUTH_TOKEN, EPermissions, RoutePermissions } from '$lib/utils/constants';
import { redirect } from '@sveltejs/kit';

import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, fetch, request }) => {
	console.log('Log');

	const requestUrl = new URL(request.url);
	const dushAuth = event.cookies.get(AUTH_TOKEN);
	const requestMethod = event.request.method;

	console.log('Request URL:', requestUrl.href);
	console.log('DushAuth:', dushAuth);

	// Bypass the login and logout routes
	if (requestUrl.pathname.endsWith('login') || requestUrl.pathname.endsWith('logout')) {
		return await fetch(request);
	}

	// Create the redirect URL, but avoid appending multiple redirect parameters
	// let redirectUrl = `/login?redirect=${encodeURIComponent(requestUrl.pathname + requestUrl.search)}`;
	let redirectUrl = `/login`;

	if (!dushAuth) {
		console.log('Not found');
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401
		});
	}

	const { isAuthorized, user } = await authMiddleware(event.cookies);

	if (!isAuthorized) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401
		});
	}

	// @ts-expect-error - add user to locals
	event.locals.user = user;

	const dushRoles: Array<{
		attributes: {
			permission: EPermissions;
		};
	}> = user.attributes.dush_roles.data;

	let hasPermission = false;

	if (requestMethod === 'GET') {
		hasPermission = dushRoles.some((role) => role.attributes.permission === EPermissions.READ);
	}

	// Check for route permissions
	RoutePermissions.forEach((route) => {
		if (requestUrl.pathname.includes(route.url) && route.method === requestMethod) {
			hasPermission = dushRoles.some((role) =>
				route.permissions.includes(role.attributes.permission)
			);
		}
	});

	if (!hasPermission) {
		console.log('User not authorized for ', {
			method: requestMethod,
			url: requestUrl.pathname
		});
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401
		});
	}

	return await fetch(request);
};
