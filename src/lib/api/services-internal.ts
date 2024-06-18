import { API_AUTH, API_USER } from './config-internal';

export async function loginUserInternal(username: string, password: string) {
	return await API_AUTH.post('/login', {
		username,
		password
	});
}
export async function createCustomerInternal(
	expiry: string,
	name: string,
	username: string | null = null
) {
	return await API_USER.post('/create', {
		username,
		name,
		expiry
	});
}
