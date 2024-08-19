import { createRole } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const requestObj = await request.json();
	const userReq = {
		name: requestObj.name,
		permissions: requestObj.permissions.map((permission: string) => ({
			permission
		}))
	};

	if (!userReq.name || !userReq.permissions) {
		return new Response(JSON.stringify({ message: 'Name and Permision are required' }), {
			status: 400
		});
	}

	const res = await createRole(cookies, userReq.name, userReq.permissions);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});
	return response;
};
