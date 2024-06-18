import { API_AUTH, API_DIRECTORY, API_USER } from './config-internal';

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

export async function logoutUserInternal() {
	return await API_AUTH.post('/logout');
}

export async function getAllDirectoriesInternal() {
	return await API_DIRECTORY.get('/');
}

export async function getDirectoryByIDInternal(id: string) {
	return await API_DIRECTORY.get('/' + id);
}

export async function createDirectoryInternal(name: string, id: number) {
	return await API_DIRECTORY.post('/create', {
		name,
		id
	});
}

export async function updateDirectoryInternal(id: number, data: any) {
	return await API_DIRECTORY.post('/update' + id, {
		data
	});
}
