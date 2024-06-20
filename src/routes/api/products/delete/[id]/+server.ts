import { deleteFile, deleteProduct } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	const id = params.id.split('_')[0];
	const fileId = params.id.split('_')[1];

	if (!id || !fileId) {
		return new Response(JSON.stringify({ message: 'Id is required' }), {
			status: 400
		});
	}

	const promises = [deleteProduct(cookies, parseInt(id)), deleteFile(cookies, parseInt(fileId))];
	const [res, resFile] = await Promise.all(promises);

	if (res.status !== 200 || resFile.status !== 200) {
		return new Response(JSON.stringify({ message: 'Error deleting product' }), {
			status: 500
		});
	}

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
