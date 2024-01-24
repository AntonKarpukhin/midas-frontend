import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import styles from './layout-thanks-page.module.css';

const LayoutThanksPage = () => {

	const navigate = useNavigate();


	useEffect(() => {
		const path = localStorage.getItem('path');
		if (path !== 'placing') {
			navigate('/');
		}
	}, [])

	const onThanks = () => {
		localStorage.removeItem('path');
		navigate('/');
	}

	return (
		<div className={styles.LayoutThanksPage}>
			<h2 className={styles.title}>Спасибо за заказ!</h2>
			<button className={styles.button} type={'button'} onClick={onThanks}>{ `<<< Вернуться на главную страницу`}</button>
		</div>
	)
}

export default LayoutThanksPage;