import { getAllUsers } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies }) => {
	try {
		const res = await getAllUsers(cookies);

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
