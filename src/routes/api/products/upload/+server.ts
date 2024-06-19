import { uploadFile } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const data = await request.formData();
	const file = data.get('file');
	const path = data.get('path') || '';
	const refId = data.get('refId') || '';
	const ref = data.get('ref') || '';
	const field = data.get('field') || '';

	if (!file) {
		return new Response(JSON.stringify({ error: 'File not provided' }), {
			status: 400
		});
	}

	const formData = new FormData();
	formData.append('files', file);
	formData.append('path', path);
	formData.append('refId', refId);
	formData.append('ref', 'products');
	formData.append('field', field);

	const res = await uploadFile(cookies, formData);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});
	return response;
};
