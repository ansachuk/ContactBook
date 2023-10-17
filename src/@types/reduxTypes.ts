import store from "../redux/store";
import { AuthResponce, Contact } from "./types";

export type FilterState = string;

export type ContactState = {
	items: Contact[];
	isLoading: boolean;
	error: Error | null;
};

export type AuthState = AuthResponce & {
	isLoggedIn: boolean;
	isLoading: boolean;
	error: Error | null;
};

export type State = {
	filter: FilterState;
	contacts: ContactState;
	auth: AuthState;
};

export type AppDispatch = typeof store.dispatch;
