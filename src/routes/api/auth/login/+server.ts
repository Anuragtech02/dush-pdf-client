import { loginUser } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const requestObj = await request.json();
	const userReq = {
		username: requestObj.username,
		password: requestObj.password
	};

	if (!userReq.username || !userReq.password) {
		return new Response(JSON.stringify({ message: 'Username and password are required' }), {
			status: 400
		});
	}

	const res = await loginUser(userReq.username, userReq.password);
	const headers = new Headers();
	if (res.headers) {
		for (const [key, value] of Object.entries(res.headers)) {
			headers.set(key, value);
		}
	}

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	cookies.set('DUSH_AUTH_TOKEN', res.data.token, {
		httpOnly: true,
		secure: true,
		path: '/'
	});

	return response;
};
