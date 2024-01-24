import { ReactNode } from "react";
import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store/store-types";


const ProtectedRoute = ({children} : {children: ReactNode}) => {
	const jwt = useSelector((state: RootState) => state.user.jwt)
	if (!jwt) {
		return <Navigate to={'/login'} replace/>
	}

	return children
}

export default ProtectedRoute;