import { createDirectory } from '$lib/api/services';
import { AUTH_TOKEN } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const requestObj = await request.json();
	const createReq = {
		name: requestObj.name,
		id: ''
	};

	//extract id from cookies
	const token = cookies.get(AUTH_TOKEN);

	if (!token) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401
		});
	}

	const decoded = JSON.parse(atob(token.split('.')[1]));

	createReq.id = decoded.id;

	if (!createReq.name) {
		return new Response(JSON.stringify({ message: 'Directory name is required' }), {
			status: 400
		});
	}

	const res = await createDirectory(cookies, createReq.name, parseInt(createReq?.id));

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
