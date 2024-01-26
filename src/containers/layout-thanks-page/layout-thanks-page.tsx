import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import styles from './layout-thanks-page.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../services/store/store-types.ts";

const LayoutThanksPage = () => {

	const { orderNumber } = useSelector((state: RootState) => state.order);
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
			<h2 className={styles.title}>Ваш заказ №  <span style={{color: "yellow"}}>{`${orderNumber}`}</span></h2>
			<button className={styles.button} type={'button'} onClick={onThanks}>{ `<<< Вернуться на главную страницу`}</button>
		</div>
	)
}

export default LayoutThanksPage;