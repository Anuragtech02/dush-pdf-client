import { getAllFiles } from '$lib/api/services';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const res = await getAllFiles(cookies);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});
	return response;
};
