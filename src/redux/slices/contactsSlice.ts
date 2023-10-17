import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "../operations";
import { ContactState } from "../../@types/reduxTypes";
import { Contact } from "../../@types/types";

const initialState: ContactState = {
	items: [],
	isLoading: false,
	error: null,
};

const handleLoading = (state: ContactState) => {
	state.isLoading = true;
};

const handleRejected = (state: ContactState, action: PayloadAction<Error>) => {
	state.isLoading = false;
	state.error = action.payload;
};

const handleFullfilled = (state: ContactState) => {
	state.isLoading = false;
	state.error = null;
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {},

	extraReducers: builder =>
		builder
			.addCase(fetchContacts.fulfilled, (state, { payload }) => {
				handleFullfilled(state);
				state.items = payload;
			})
			.addCase(addContact.fulfilled, (state, { payload }) => {
				handleFullfilled(state);
				state.items.push(payload);
			})
			.addCase(deleteContact.fulfilled, (state, { payload }) => {
				handleFullfilled(state);
				state.items = state.items.filter(({ id }) => id !== (payload as unknown as Contact).id);
			})
			.addMatcher(action => action.type.endsWith("/pending"), handleLoading)
			.addMatcher(action => action.type.endsWith("/rejected"), handleRejected),
});

export default contactsSlice.reducer;
