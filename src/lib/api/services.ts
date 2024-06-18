import type { Cookies } from '@sveltejs/kit';
import { API_AUTH, API } from './config';
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
	return await API.post(
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

export async function getAllDirectories(cookies: Cookies) {
	return await API.get('/directories', {
		headers: getAuthHeaders(cookies)
	});
}

export async function getDirectoryByID(cookies: Cookies, id: string) {
	return await API.get('/directories/' + id, {
		headers: getAuthHeaders(cookies)
	});
}

export async function createDirectory(cookies: Cookies, name: string, id: number) {
	return await API.post(
		'/directories',
		{
			name,
			id
		},
		{
			headers: getAuthHeaders(cookies)
		}
	);
}

export async function updateDirectory(cookies: Cookies, id: number, data: any) {
	return await API.post(
		'/directories/' + id,
		{
			data
		},
		{
			headers: getAuthHeaders(cookies)
		}
	);
}
