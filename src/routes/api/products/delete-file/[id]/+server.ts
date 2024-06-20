import { deleteProduct } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	if (!params.id) {
		return new Response(JSON.stringify({ message: 'Id is required' }), {
			status: 400
		});
	}

	const res = await deleteProduct(cookies, parseInt(params.id));

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});
	return response;
};
