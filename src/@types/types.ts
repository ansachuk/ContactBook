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

export type State = {
	filter: string;
	contacts: {
		items: User[];
		isLoading: boolean;
		error: Error | null;
	};
	auth: AuthResponce & {
		isLoggedIn: boolean;
		isLoading: boolean;
		error: Error;
	};
};
