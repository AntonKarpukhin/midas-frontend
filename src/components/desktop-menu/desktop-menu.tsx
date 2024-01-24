import { DesktopMenuProps } from "./desktop-menu.props";
import { MouseEvent, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from './desktop-menu.module.css';
import cn from 'classnames';
import { findMenuPath } from "../../utils/findMenuPath";

const DesktopMenu = ({ onClickMenu }: DesktopMenuProps) => {

	const [subMenu, setSubMenu] = useState<string | null>(null);
	const [activeMenu, setActiveMenu] = useState<string>('');

	const {pathname} = useLocation();

	useEffect(() => {
		if (pathname.slice(1, 8) === 'catalog') {
			const path = pathname.slice(9)
			const v = findMenuPath(path)
			setActiveMenu(v)
		} else {
			setActiveMenu('')
		}
	}, [pathname]);

	const onOpenSubMenu = (e: MouseEvent) => {
		const { value } = e.target;
		if (value === undefined || subMenu === value) {
			setSubMenu(null);
			return;
		}
		setSubMenu(value);
	};

	const onChangeActive = (s: string) => {
		setActiveMenu(s);
		onClickMenu(s)
	};

	return (
		<div className={cn(styles['DesktopMenu'])} onClick={onOpenSubMenu}>
			<Link to={'/catalog/stock'} className={cn(styles.link, {
				[styles.activeLink]: activeMenu === 'Акции'
			})} onClick={() => onChangeActive('Акции')}>
				{ 'Акции'.toUpperCase() }
			</Link>
			<img src="/Hot.svg" alt="Акция" className={styles.imgStock}/>
			<div className={styles.wrapperButton}>
				<button value='hot' className={cn(styles.button, styles.linkHover, {
					[styles.activeLink]: activeMenu === 'Горячие блюда' || activeMenu === 'Супы' || activeMenu === 'Хинкали',
				})}>
					ГОРЯЧЕЕ
					<svg className={cn(styles.arrow, {[styles.arrowRotate]: subMenu === 'hot'})} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.19884 4.6013e-07L5.71295 4.51411L4.51411 5.71295L0 1.19884L1.19884 4.6013e-07Z" fill="white"/>
						<path d="M9.03 1.19884L4.51589 5.71295L3.31705 4.51411L7.83116 0L9.03 1.19884Z" fill="white"/>
					</svg>
				</button>
				{subMenu === 'hot' && <div className={styles.wrapperLink}>
                    <Link to={'/catalog/hot'} className={cn(styles['link'])} onClick={() => onChangeActive('Горячие блюда')}>
						{ 'Горячие блюда'.toUpperCase() }
                    </Link>
                    <Link to={'/catalog/soups'} className={cn(styles['link'])} onClick={() => onChangeActive('Супы')}>
						{ 'Супы'.toUpperCase() }
                    </Link>
                    <Link to={'/catalog/khinkali'} className={cn(styles['link'])} onClick={() => onChangeActive('Хинкали')}>
						{ 'Хинкали'.toUpperCase() }
                    </Link>
				</div>}
			</div>
			<div className={styles.wrapperButton}>
				<button value='cold' className={cn(styles.button, styles.linkHover, {
					[styles.activeLink]: activeMenu === 'Холодные закуски' || activeMenu === 'Салаты',
				})}>
					ХОЛОДНОЕ
					<svg className={cn(styles.arrow, {[styles.arrowRotate]: subMenu === 'cold'})} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.19884 4.6013e-07L5.71295 4.51411L4.51411 5.71295L0 1.19884L1.19884 4.6013e-07Z" fill="white"/>
						<path d="M9.03 1.19884L4.51589 5.71295L3.31705 4.51411L7.83116 0L9.03 1.19884Z" fill="white"/>
					</svg>
				</button>
				{subMenu === 'cold' && <div className={styles.wrapperLink}>
                    <Link to={'/catalog/cold'} className={cn(styles['link'])} onClick={() => onChangeActive('Холодные закуски')}>
						{ 'Холодные закуски'.toUpperCase() }
                    </Link>
                    <Link to={'/catalog/salads'} className={cn(styles['link'])} onClick={() => onChangeActive('Салаты')}>
						{ 'Салаты'.toUpperCase() }
                    </Link>
				</div>}
			</div>
			<Link to={'/catalog/bakery'} className={cn(styles['link'], {
				[styles.activeLink]: activeMenu === 'Свежая выпечка'
			})} onClick={() => onChangeActive('Свежая выпечка')}>
				{ 'Свежая выпечка'.toUpperCase() }
			</Link>
			<Link to={'/catalog/dessert'} className={cn(styles['link'], {
				[styles.activeLink]: activeMenu === 'Десерты'
			})} onClick={() => onChangeActive('Десерты')}>
				{ 'Десерты'.toUpperCase() }
			</Link>
			<Link to={'/catalog/beverages'} className={cn(styles['link'], {
				[styles.activeLink]: activeMenu === 'Напитки'
			})} onClick={() => onChangeActive('Напитки')}>
				{ 'Напитки'.toUpperCase() }
			</Link>
		</div>
	)
}

export default DesktopMenu;