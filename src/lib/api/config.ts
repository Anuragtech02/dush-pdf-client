import axios from 'axios';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
import { AUTH_TOKEN } from '$lib/utils/constants';
import jwt from 'jsonwebtoken';
import { getUserByID } from './services';

const API_URL = env.API_URL as string;
const JWT_SECRET = env.DUSH_JWT_SECRET;
const STRAPI_TOKEN = env.DUSH_STRAPI_TOKEN as string;

export function getStrapiAuthHeaders() {
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${STRAPI_TOKEN}`
	};
}

export async function authMiddleware(cookies: Cookies) {
	const authToken = cookies.get(AUTH_TOKEN);

	if (!authToken) {
		return {
			isAuthorized: false,
			user: {}
		};
	}

	try {
		const decoded = jwt.verify(authToken, JWT_SECRET) as { id: number };

		const userRes = await getUserByID(cookies, decoded.id);

		if (!userRes.data) {
			console.log('User not found in DB', userRes.data);
			return {
				isAuthorized: false,
				user: {}
			};
		}

		return {
			isAuthorized: true,
			user: userRes.data.data
		};
	} catch (error) {
		return {
			isAuthorized: false,
			user: {}
		};
	}
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
