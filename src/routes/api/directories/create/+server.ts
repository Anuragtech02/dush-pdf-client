import { createDirectory } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const requestObj = await request.json();
	const createReq = {
		name: requestObj.name,
		id: requestObj.id
	};

	if (!createReq.name) {
		return new Response(JSON.stringify({ message: 'Directory name is required' }), {
			status: 400
		});
	}

	const res = await createDirectory(cookies, createReq.name, createReq.id);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
