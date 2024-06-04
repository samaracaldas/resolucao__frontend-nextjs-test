export interface IUser {
	id: number;
	name: string;
	email: string;
}

// Correção da interface IUserCreate
export interface IUserCreate {
	name: string;
	email: string;
}
