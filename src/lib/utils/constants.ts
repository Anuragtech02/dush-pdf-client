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
	},
	{
		route: '/roles/create',
		method: 'POST',
		permissions: [EPermissions.MANAGE]
	}
];

export const ALL_PERMISSIONS = [
	'CREATE_USER',
	'READ_USER',
	'UPDATE_USER',
	'DELETE_USER',
	'CREATE_FILE',
	'READ_FILE_ALL',
	'READ_FILE_SELECT',
	'UPDATE_FILE',
	'DELETE_FILE',
	'CREATE_DIRECTORY',
	'READ_DIRECTORY_ALL',
	'READ_DIRECTORY_SELECT',
	'UPDATE_DIRECTORY',
	'DELETE_DIRECTORY',
	'CREATE_ROLE',
	'READ_ROLE',
	'UPDATE_ROLE',
	'DELETE_ROLE'
] as const;
