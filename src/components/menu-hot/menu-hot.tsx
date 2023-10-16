import styles from './menu-hot.module.css';
import { NavLink } from 'react-router-dom';

const MenuHot = () => {
	return (
		<div className={styles.wrapper}>
			<ul className={styles.wrapperUl}>
				<NavLink className={styles.link}>Горячие блюда</NavLink>
				<NavLink className={styles.link}>Супы</NavLink>
				<NavLink className={styles.link}>Хинкали</NavLink>
			</ul>
		</div>
	);
};


export default MenuHot;