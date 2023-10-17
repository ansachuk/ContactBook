import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn, selectToken } from "../../redux/selectors";
import { refresh } from "../../redux/operations";

import PrivatRoute from "../../components/PrivatRoute/PrivatRoute";
import PublicRoute from "../../components/PublicRoute/PublicRoute";
import Loader from "../../components/Loader/Loader";
import { AppDispatch } from "../../@types/reduxTypes";

const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));

export function App() {
	const isAuth = useSelector(selectIsLoggedIn);
	const token = useSelector(selectToken);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (token && !isAuth) {
			dispatch(refresh(token));
		}
	}, [dispatch, isAuth, token]);

	return (
		<Suspense fallback={<Loader isLoading={true} />}>
			<Routes>
				<Route
					path="/contacts"
					element={
						<PrivatRoute>
							<ContactsPage />
						</PrivatRoute>
					}
				/>

				<Route
					path="/register"
					element={
						<PublicRoute>
							<RegisterPage />
						</PublicRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route path="/*" element={<Navigate to="/login" />} />
			</Routes>
		</Suspense>
	);
}
