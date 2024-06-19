import { deleteDirectory } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ cookies, params }) => {
	const { id } = params;

	if (!id) {
		return new Response(JSON.stringify({ message: 'Directory ID is required' }), {
			status: 400
		});
	}

	const res = await deleteDirectory(cookies, parseInt(id));

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
