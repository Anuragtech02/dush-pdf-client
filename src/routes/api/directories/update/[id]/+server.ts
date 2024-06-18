import { updateDirectory } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, cookies, params }) => {
	const { id } = params;
	const requestObj = await request.json();
	const createReq = {
		data: requestObj.data
	};

	if (!id) {
		return new Response(JSON.stringify({ message: 'Directory ID is required' }), {
			status: 400
		});
	}

	const res = await updateDirectory(cookies, parseInt(id), createReq.data);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
