import { getUserByID } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const { id } = params;

	if (!id) {
		return new Response(JSON.stringify({ message: 'User ID is required' }), {
			status: 400
		});
	}

	try {
		const res = await getUserByID(cookies, parseInt(id));

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
