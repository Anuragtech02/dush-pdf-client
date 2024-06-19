export interface IFolder {
	id: string;
	name: string;
	parentId: string;
	createdAt: string;
	updatedAt: string;
	children?: IFolder[];
}
