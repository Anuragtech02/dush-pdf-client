import { getDirectoryByID } from '$lib/api/services';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies, locals }) => {
	const { id } = params;

	const user = locals.user;

	const accessibleDirectories = user.attributes.accessibleDirectories.data;
	console.log('Access', accessibleDirectories);
	// const filters = "?filter["

	const res = await getDirectoryByID(cookies, id);

	const response = new Response(JSON.stringify(res.data), {
		status: res.status,
		statusText: res.statusText
	});

	return response;
};
