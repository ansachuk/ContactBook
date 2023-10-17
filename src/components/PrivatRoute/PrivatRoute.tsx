import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/selectors";

type Props = { children: ReactNode };

const PrivatRoute = ({ children }: Props) => {
	const isAuth = useSelector(selectIsLoggedIn);
	return isAuth ? children : <Navigate to="/login" />;
};
export default PrivatRoute;
