import axios from 'axios';

const API_URL = '/api';

export const API_AUTH = axios.create({
	baseURL: API_URL + '/auth',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const API_USER = axios.create({
	baseURL: API_URL + '/user',
	headers: {
		'Content-Type': 'application/json'
	}
});
