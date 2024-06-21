import { getProuctById } from '$lib/api/services';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	const { id } = params;

	if (!id) {
		return {
			status: 400,
			error: new Error('PDF ID is required')
		};
	}

	const productRes = await getProuctById(cookies, parseInt(id));

	if (!productRes) {
		return {
			status: 404,
			error: new Error('PDF not found')
		};
	}

	const pdfUrl = productRes.data.data.attributes.pdf.data.attributes.url;

	const response = await fetch(pdfUrl);
	if (!response.ok) {
		throw new Error('Failed to fetch PDF');
	}
	const arrayBuffer = await response.arrayBuffer();
	const base64Pdf = Buffer.from(arrayBuffer).toString('base64');

	// console.log('Array', base64Pdf);

	return {
		pdfData: `data:application/pdf;base64,${base64Pdf}`
	};
};
