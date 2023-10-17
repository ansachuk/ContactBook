import { createSelector } from "@reduxjs/toolkit";
import { State } from "../@types/reduxTypes";

export const selectContacts = ({ contacts }: State) => contacts.items;
export const selectContactsIsLoading = ({ contacts }: State) => contacts.isLoading;
export const selectContactsError = ({ contacts }: State) => contacts.error;

export const selectFilter = ({ filter }: State) => filter;

export const selectFilteredContacts = createSelector([selectContacts, selectFilter], (contacts, filter) => {
	const filteredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
	return filteredContacts;
});

export const selectIsLoggedIn = ({ auth }: State) => auth.isLoggedIn;
export const selectUser = ({ auth }: State) => auth.user;
export const selectToken = ({ auth }: State) => auth.token;
export const selectAuthIsLoading = ({ auth }: State) => auth.isLoading;
export const selectAuthError = ({ auth }: State) => auth.error;
