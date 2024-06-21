import { authMiddleware } from '$lib/api/config';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies, request }) => {
	let user = locals.user;

	if (user) {
		return { user };
	}
	console.log('User', user);

	const requestUrl = new URL(request.url);

	const { isAuthorized, user: apiUser } = await authMiddleware(cookies);
	// console.log(requestUrl);

	if (!user) {
		if (!isAuthorized) {
			if (requestUrl.pathname !== '/login') {
				let redirectUrl = `/login?redirect=${encodeURIComponent(requestUrl.pathname)}`;
				throw redirect(301, redirectUrl);
			}
		}
		user = apiUser;
		locals.user = user;
	}

	if (!user) {
		if (requestUrl.pathname !== '/login') {
			let redirectUrl = `/login?redirect=${encodeURIComponent(requestUrl.pathname)}`;
			throw redirect(301, redirectUrl);
		}
	}

	return {
		user
	};
};
