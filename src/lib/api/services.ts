import type { Cookies } from '@sveltejs/kit';
import { API_AUTH, API_USER } from './config';
import { AUTH_TOKEN } from '$lib/utils/constants';

function getAuthHeaders(cookies: Cookies) {
	const authCookie = cookies.get(AUTH_TOKEN);
	return {
		DushAuthorization: authCookie,
		'Content-Type': 'application/json'
	};
}

export async function loginUser(username: string, password: string) {
	return await API_AUTH.post('/login', {
		username,
		password
	});
}

export async function createCustomer(
	cookies: Cookies,
	expiry: string,
	name: string,
	username: string | null = null
) {
	return await API_USER.post(
		'/generate-user',
		{
			username,
			name,
			expiry
		},
		{
			headers: getAuthHeaders(cookies)
		}
	);
}
