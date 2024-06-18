import { getAllDirectories } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const res = await getAllDirectories(cookies);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
