import { authMiddleware } from '$lib/api/config';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies, request }) => {
	return {
		user: locals.user
	};
};
