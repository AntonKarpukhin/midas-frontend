import styles from './footer.module.css';
import {useLocation} from 'react-router-dom'
import { useEffect } from "react";

const Footer = () => {

	const {pathname} = useLocation();

	useEffect(() => {
		return () => {
			if (pathname === '/thanks') {
				localStorage.removeItem('path');
			}
		}
	}, [pathname])

	return (
		<footer className={styles.Footer}>
			<div className={styles.wrapperContacts}>
				<img className={styles.logo} src="/Logo.svg" alt="Логотип"/>
				<div className={styles.wrapperTel}>
					<a className={styles.tel} href="tel:+79999999999">+7 (999) 999-99-99</a>
					<a className={styles.email} href="mailto:delivery@midas.rest">delivery@midas.rest</a>
				</div>
			</div>
			<div className={styles.line}></div>
			<div className={styles.wrapperPolicy}>
				<p className={styles.byNamed}>© 2024, Project «MIDAS», by Anton Karpukhin</p>
				<div className={styles.wrapperTerms}>
					<p className={styles.policy}>Политика конфиденциальности и оферта</p>
					<p className={styles.terms}>Пользовательское соглашение</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer;