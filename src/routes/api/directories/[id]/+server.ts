import { getDirectoryByID } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const { id } = params;
	const res = await getDirectoryByID(cookies, id);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
