import { API_AUTH } from './config';

export async function loginUser(username: string, password: string) {
	return await API_AUTH.post('/login', {
		username,
		password
	});
}
