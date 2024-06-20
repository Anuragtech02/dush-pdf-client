import { getUserByID } from '$lib/api/services';
import { AUTH_TOKEN } from '$lib/utils/constants';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
	const authToken = cookies.get(AUTH_TOKEN);
	if (!authToken) {
		return {
			user: {}
		};
	}

	const decoded = JSON.parse(atob(authToken.split('.')[1]));

	try {
		const userRes = await getUserByID(cookies, decoded.id);
		return {
			user: userRes?.data?.data || {}
		};
	} catch (error) {
		return {
			user: {},
			error
		};
	}
};
