export type User = {
	name: string;
	email: string;
};

export type Contact = {
	id: string;
	name: string;
	phone: string;
};

export type AuthResponce = {
	user: User;
	token: string;
};
