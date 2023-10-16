import { Link, Outlet } from 'react-router-dom';


const Layout = () => {
	return (
		<div>
			<div>
				<Link to='/'>Menu</Link>
				<Link to='/card'>Card</Link>
			</div>
			<div>
				<Outlet/>
			</div>
		</div>
	);
};

export default Layout;