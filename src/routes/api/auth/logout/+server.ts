import { loginUser } from '$lib/api/services';
import { AUTH_TOKEN } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const response = new Response(
		JSON.stringify({
			message: 'Logout successful'
		}),
		{
			status: 200,
			statusText: 'OK'
		}
	);

	cookies.set(AUTH_TOKEN, '', {
		httpOnly: true,
		secure: true,
		path: '/',
		expires: new Date(0)
	});

	return response;
};
