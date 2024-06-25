import { getUserByID } from '$lib/api/services';
import { AUTH_TOKEN } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies }) => {
	//extract id from cookies
	const token = cookies.get(AUTH_TOKEN);

	if (!token) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401
		});
	}

	const decoded = JSON.parse(atob(token.split('.')[1]));

	if (!decoded.id) {
		return new Response(JSON.stringify({ message: 'User ID not found in token' }), {
			status: 400
		});
	}

	try {
		const res = await getUserByID(cookies, decoded.id);

		const response = new Response(JSON.stringify(res.data), {
			status: res.status,
			statusText: res.statusText
		});
		return response;
	} catch (error: any) {
		const response = new Response(
			JSON.stringify({
				message: error.message
			}),
			{
				status: error.status,
				statusText: error.code
			}
		);
		return response;
	}
};
