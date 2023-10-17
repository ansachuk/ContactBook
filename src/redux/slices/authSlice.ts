import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, logout, signupUser, refresh } from "../operations";
import { AuthState } from "../../@types/reduxTypes";
import { User } from "../../@types/types";

const initialState: AuthState = {
	user: { name: "", email: "" },
	token: "",
	isLoggedIn: false,
	isLoading: false,
	error: null,
};

const handleLoading = (state: AuthState) => {
	state.isLoading = true;
};

const handleRejected = (state: AuthState, action: PayloadAction<Error>) => {
	state.isLoading = false;
	state.error = action.payload;
};

const handleFullfilled = (state: AuthState) => {
	state.isLoading = false;
	state.error = null;
};

const handleLogin = (state: AuthState, action: PayloadAction<Pick<AuthState, "token" | "user">>) => {
	const { token, user } = action.payload;

	handleFullfilled(state);
	state.token = token;
	state.user = user;
	state.isLoggedIn = true;
};

const handleLogout = (state: AuthState) => {
	state.isLoggedIn = false;
	state.token = "";
	state.user = { name: "", email: "" };
	state.isLoading = false;
	state.error = null;
};

const handleRefresh = (state: AuthState, action: PayloadAction<User>) => {
	handleFullfilled(state);
	state.user = action.payload;
	state.isLoggedIn = true;
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},

	extraReducers: builder =>
		builder
			.addCase(signupUser.fulfilled.type, handleLogin)
			.addCase(login.fulfilled.type, handleLogin)
			.addCase(logout.fulfilled, handleLogout)
			.addCase(refresh.fulfilled, handleRefresh)
			.addMatcher(action => action.type.endsWith("/pending"), handleLoading)
			.addMatcher(action => action.type.endsWith("/rejected"), handleRejected),
	// {

	// 	[]: ,
	// 	[login.fulfilled]: handleLogin,
	// 	[logout.fulfilled]: ,
	// 	[refresh.fulfilled]: ,
	// },
});

export default authSlice.reducer;
