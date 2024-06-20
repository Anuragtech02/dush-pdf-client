export const AUTH_TOKEN = 'DUSH_AUTH_TOKEN';
export enum EPermissions {
	CREATE = 'CREATE',
	READ = 'READ',
	MANAGE = 'MANAGE'
}

export const RoutePermissions = [
	{
		route: '/directories',
		method: 'POST',
		permissions: [EPermissions.CREATE, EPermissions.MANAGE]
	},
	{
		route: '/directories/create',
		method: 'POST',
		permissions: [EPermissions.CREATE, EPermissions.MANAGE]
	},
	{}
];
