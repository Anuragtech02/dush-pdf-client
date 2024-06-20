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
	{
		route: '/directories/update',
		method: 'PUT',
		permissions: [EPermissions.MANAGE]
	},
	{
		route: '/directories/delete',
		method: 'DELETE',
		permissions: [EPermissions.MANAGE]
	},
	{
		route: '/users/create',
		method: 'POST',
		permissions: [EPermissions.MANAGE]
	},
	{
		route: '/products/create',
		method: 'POST',
		permissions: [EPermissions.CREATE]
	},
	{
		route: '/products/upload',
		method: 'POST',
		permissions: [EPermissions.CREATE]
	},
	{
		route: '/products/delete',
		method: 'DELETE',
		permissions: [EPermissions.MANAGE]
	}
];
