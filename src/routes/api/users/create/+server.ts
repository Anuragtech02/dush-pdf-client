import { createCustomer, loginUser } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const requestObj = await request.json();
	const userReq = {
		expiry: requestObj.expiry,
		name: requestObj.name,
		username: requestObj.username || null
	};

	if (!userReq.name || !userReq.expiry) {
		return new Response(JSON.stringify({ message: 'Name and Expiry are required' }), {
			status: 400
		});
	}

	const res = await createCustomer(cookies, userReq.expiry, userReq.name, userReq.username);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});
	return response;
};
