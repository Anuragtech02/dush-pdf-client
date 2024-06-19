import { createProduct } from '$lib/api/services';
import { AUTH_TOKEN } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const requestObj = await request.json();
	const fileReq = {
		fileId: requestObj.fileId,
		name: requestObj.name,
		id: ''
	};

	if (!fileReq.fileId || !fileReq.name) {
		return new Response(JSON.stringify({ message: 'Name and Expiry are required' }), {
			status: 400
		});
	}

	//extract id from cookies
	const token = cookies.get(AUTH_TOKEN);

	if (!token) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401
		});
	}

	const decoded = JSON.parse(atob(token.split('.')[1]));

	fileReq.id = decoded.id;

	const res = await createProduct(cookies, fileReq.fileId, fileReq.name, parseInt(fileReq.id));

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});
	return response;
};
