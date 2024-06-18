import axios from 'axios';
import { env } from '$env/dynamic/private';

const API_URL = env.API_URL as string;

export const API_AUTH = axios.create({
	baseURL: API_URL + '/auth',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const API_USER = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});
