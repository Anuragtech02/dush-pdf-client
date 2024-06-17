import { API_AUTH } from './config-internal';

export async function loginUserInternal(username: string, password: string) {
	return await API_AUTH.post('/login', {
		username,
		password
	});
}
