export type User = {
	id?: string;
	name: string;
	email: string;
	password?: string;
	products?: Product[];
};

export type Product = {
	id?: string;
	title: string;
	price: number;
	description: string;
	image: string | File;
	rating: number;
	createdAt: Date;
	user?: User;
	userId: string;
};
