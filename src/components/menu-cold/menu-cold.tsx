import styles from './menu-cold.module.css';
import { NavLink } from 'react-router-dom';

const MenuCold = () => {
	return (
		<div className={styles.wrapper}>
			<ul className={styles.wrapperUl}>
				<NavLink className={styles.link}>Холодные закуски</NavLink>
				<NavLink className={styles.link}>Салаты</NavLink>
				<NavLink className={styles.link}>Ассорти</NavLink>
			</ul>
		</div>
	);
};


export default MenuCold;