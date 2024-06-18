export interface IFolder {
	id: string;
	
	name: string;
	parentId: string;
	children?: IFolder[];
}
