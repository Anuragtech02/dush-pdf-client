import axios from 'axios';
import { env } from '$env/dynamic/private';

const API_URL = env.API_URL as string;
const STRAPI_TOKEN = env.DUSH_STRAPI_TOKEN as string;

export function getStrapiAuthHeaders() {
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${STRAPI_TOKEN}`
	};
}

export const API_AUTH = axios.create({
	baseURL: API_URL + '/auth',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const API = axios.create({
	baseURL: API_URL,
	headers: getStrapiAuthHeaders()
});
