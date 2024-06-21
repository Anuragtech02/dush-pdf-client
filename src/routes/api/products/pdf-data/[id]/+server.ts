import { getProuctById } from '$lib/api/services';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const { id } = params;

	if (!id) {
		return new Response(JSON.stringify({ message: 'Product ID is required' }), {
			status: 400
		});
	}

	const productRes = await getProuctById(cookies, parseInt(id));

	if (!productRes) {
		return new Response(JSON.stringify({ message: 'Product not found' }), {
			status: 404
		});
	}

	const pdfUrl = productRes.data.data.attributes.pdf.data.attributes.url;

	const pdfResponse = await fetch(pdfUrl);
	if (!pdfResponse.ok) {
		return new Response(JSON.stringify({ message: 'PDF not found' }), {
			status: 404
		});
	}
	const arrayBuffer = await pdfResponse.arrayBuffer();
	const base64Pdf = Buffer.from(arrayBuffer).toString('base64');

	const response = new Response(
		JSON.stringify({
			pdfData: `data:application/pdf;base64,${base64Pdf}`
		}),
		{
			status: 201
		}
	);
	return response;
};
