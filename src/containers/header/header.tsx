import DesktopMenu from "../../components/desktop-menu/desktop-menu";
import { useEffect, useState } from "react";
import HeaderIcons from "../../components/header-icons/header-icons";
import styles from './header.module.css';
import TabletMenu from "../../components/tablet-menu/tablet-menu";
import TabletPopup from "../../components/tablet-popup/tablet-popup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { getCatalog } from "../../services/reducers/catalog-reducer";
import { Link } from "react-router-dom";
import { getAllDish } from "../../services/reducers/basket-reducer";

const Header = () => {

	const [modal, setModal] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const {jwt} = useSelector((state: RootState) => state.auth);
	const { basket } = useSelector((state: RootState) => state.basket);

	useEffect(() => {
		dispatch(getAllDish());
	},[])

	const getCatalogMenu = async (text: string) => {
		dispatch(getCatalog(text));
	}


	return (
		<>
			<header className={styles.Header}>
				<Link to={'/'}>
					<img className={styles.logo} src="/Logo.svg" alt="Логотип" />
				</Link>
				<DesktopMenu onClickMenu={getCatalogMenu}/>
				<TabletMenu modal={modal} setModal={setModal} />
				<HeaderIcons jwt={jwt} counter={basket.length} />
				{modal && <TabletPopup setModal={setModal} />}
			</header>
		</>
	)
}

export default Header;