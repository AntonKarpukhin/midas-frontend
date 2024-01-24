import styles from './header-icons.module.css';
import { Link } from "react-router-dom";
import { HeaderIconsProps } from "./header-icons.props";

const HeaderIcons = ({jwt, counter}: HeaderIconsProps) => {

	return (
		<div className={styles.HeaderIcons}>
			<Link to={!jwt  ?  '/login' : '/profile'} className={styles.img} >
				{!jwt ? <img src="/Cabinet.svg" alt="Кабинет"/> : <img style={{borderRadius: '100px'}} src="/cabinet.jpg" alt="Кабинет"/>}
			</Link>
			<Link to={!jwt ? '/login' : '/basket'} className={styles.img} >
				{counter && <div className={styles.basketCounter}>{counter}</div>}
				<img src="/Basket.svg" alt="Акция"/>
			</Link>
		</div>
	)
}

export default HeaderIcons;