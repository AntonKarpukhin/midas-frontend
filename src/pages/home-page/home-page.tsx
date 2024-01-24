import Header from "../../containers/header/header";
import App from "../../app";
import Footer from "../../containers/footer/footer";
import { Outlet } from 'react-router-dom';

const HomePage = () => {

	return (
		<App>
			<Header/>
			<Outlet/>
			<Footer/>
		</App>
	)
}

export default HomePage;