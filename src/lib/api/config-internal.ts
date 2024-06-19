import axios from 'axios';

const API_URL = '/api';

export const API_AUTH = axios.create({
	baseURL: API_URL + '/auth',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const API_USER = axios.create({
	baseURL: API_URL + '/users',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const API_DIRECTORY = axios.create({
	baseURL: API_URL + '/directories',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const API_PRODUCTS = axios.create({
	baseURL: API_URL + '/products',
	headers: {
		'Content-Type': 'application/json'
	}
});
