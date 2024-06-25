import { authMiddleware } from '$lib/api/config';
import { AUTH_TOKEN, EPermissions, RoutePermissions } from '$lib/utils/constants';
import { redirect } from '@sveltejs/kit';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('Log');

	const requestUrl = new URL(event.request.url);
	const dushAuth = event.cookies.get(AUTH_TOKEN);
	const requestMethod = event.request.method;

	// Bypass the login and logout routes
	if (requestUrl.pathname.endsWith('login') || requestUrl.pathname.endsWith('logout')) {
		return await resolve(event);
	}

	if (!dushAuth) {
		console.log('Not found');
		if (requestUrl.pathname.includes('api')) {
			return new Response(JSON.stringify({ message: 'Unauthorized' }), {
				status: 401
			});
		}
		if (requestUrl.pathname !== '/login') {
			let redirectUrl = `/login?redirect=${encodeURIComponent(requestUrl.pathname)}`;
			throw redirect(301, redirectUrl);
		}
	}

	const { isAuthorized, user } = await authMiddleware(event.cookies);

	if (!isAuthorized) {
		if (requestUrl.pathname.includes('api')) {
			return new Response(JSON.stringify({ message: 'Unauthorized' }), {
				status: 401
			});
		}
		if (requestUrl.pathname !== '/login') {
			let redirectUrl = `/login?redirect=${encodeURIComponent(requestUrl.pathname)}`;
			return redirect(301, redirectUrl);
		}
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
		if (event.request.url.includes(route.route) && route.method === requestMethod) {
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
		if (requestUrl.pathname !== '/login') {
			let redirectUrl = `/login?redirect=${encodeURIComponent(requestUrl.pathname)}`;
			return redirect(301, redirectUrl);
		}
	}

	event.locals.user = user;

	const res = await resolve(event);
	return res;
};
