import { API_AUTH, API_DIRECTORY, API_PRODUCTS, API_USER } from './config-internal';

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

export async function createDirectoryInternal(name: string) {
	return await API_DIRECTORY.post('/create', {
		name
	});
}

export async function updateDirectoryInternal(id: number, data: any) {
	return await API_DIRECTORY.post('/update/' + id, {
		data
	});
}

export async function deleteDirectoryInternal(id: number) {
	return await API_DIRECTORY.delete('/delete/' + id);
}

export async function shareDirectoryToId(userId: number) {
	return await updateDirectoryInternal(userId, { sharedTo: [userId] });
}

export async function getAllUsersInternal() {
	return await API_USER.get('/');
}

export async function uploadFileInternal(formData: FormData) {
	return await API_PRODUCTS.post('/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

export async function createProductInternal(fileId: string, name: string) {
	return await API_PRODUCTS.post('/create', {
		fileId,
		name
	});
}

export async function getAllFilesInternal() {
	return await API_PRODUCTS.get('/');
}

export async function deleteProductInternal(id: number, fileId: number) {
	return await API_PRODUCTS.delete('/delete/' + id + '_' + fileId);
}

export async function deleteFileInternal(id: number) {
	return await API_PRODUCTS.delete('/delete-file/' + id);
}
