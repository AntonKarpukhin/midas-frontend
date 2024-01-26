import Header from "../../containers/header/header";
import App from "../../app";
import Footer from "../../containers/footer/footer";
import { Outlet } from 'react-router-dom';
import { useEffect } from "react";
import { getProfile } from "../../services/reducers/user-reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types.ts";

const HomePage = () => {

	const {jwt} = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (jwt) {
			dispatch(getProfile());
		}
	}, [jwt])

	return (
		<App>
			<Header/>
			<Outlet/>
			<Footer/>
		</App>
	)
}

export default HomePage;