import { Link } from "react-router-dom";
import styles from './layout-not-found-page.module.css';

const LayoutNotFoundPage = () => {
	return (
		<div className={styles.LayoutNotFoundPage}>
			<h2 className={styles.title}>Такой страницы нет</h2>
			<Link className={styles.link} to={'/'}>Перейти на главную</Link>
		</div>
	)
}

export default LayoutNotFoundPage;