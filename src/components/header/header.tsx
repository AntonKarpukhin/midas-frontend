import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import MenuHot from '../menu-hot/menu-hot';
import MenuCold from '../menu-cold/menu-cold';
import TabletMenu from '../tablet-menu/tablet-menu';
import { IHeaderType } from './header.type';
import useResize from '../../hooks/use-resize';

const Header = ({changeTabletMenu, tabletMenu}: IHeaderType) => {
	const [menuHot, setMenuHot] = useState<boolean>(false);
	const [menuCold, setMenuCold] = useState<boolean>(false);
	const {width} = useResize();

	useEffect(() => {
		checkWidth();
	}, [width]);

	const checkWidth = () => {
		if (width > 1310 && tabletMenu) {
			changeTabletMenu();
		}
	};

	const changeMenu = (e) => {
		const text = e.target.parentNode.textContent.slice(0,7);
		if (text === 'ГОРЯЧЕЕ') {
			setMenuHot(menu => !menu);
			setMenuCold(false);
			return;
		}
		setMenuCold(menu => !menu);
		setMenuHot(false);
	};

	return (
		<header className={cn(styles.header, {
			[styles.headerActive]: tabletMenu
		})}>
			<div className={styles.headerWrapper}>
				<img className={styles.logo} src="../../../public/Logo.svg" alt="Логотип"/>
				<ul className={styles.wrapperUl}>
					<NavLink className={styles.link}>
						<div className={styles.wrapperLink}>
							АКЦИИ
							<img src="../../../public/Hot.svg" alt="Акция"/>
						</div>
					</NavLink>
					<button onClick={changeMenu} className={cn(styles.link, {
						[styles.linkActive]: menuHot
					})}>
						<div className={styles.wrapperLink}>
							ГОРЯЧЕЕ
							<svg className={cn(styles.arrow, {[styles.arrowRotate]: menuHot})} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.19884 4.6013e-07L5.71295 4.51411L4.51411 5.71295L0 1.19884L1.19884 4.6013e-07Z" fill="white"/>
								<path d="M9.03 1.19884L4.51589 5.71295L3.31705 4.51411L7.83116 0L9.03 1.19884Z" fill="white"/>
							</svg>
						</div>
						{menuHot && <MenuHot/>}
					</button>
					<button onClick={changeMenu} className={cn(styles.link, {
						[styles.linkActive]: menuCold
					})}>
						<div className={styles.wrapperLink}>
							ХОЛОДНОЕ
							<svg className={cn(styles.arrow, {[styles.arrowRotate]: menuCold})} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.19884 4.6013e-07L5.71295 4.51411L4.51411 5.71295L0 1.19884L1.19884 4.6013e-07Z" fill="white"/>
								<path d="M9.03 1.19884L4.51589 5.71295L3.31705 4.51411L7.83116 0L9.03 1.19884Z" fill="white"/>
							</svg>
						</div>
						{menuCold && <MenuCold/>}
					</button>
					<NavLink className={styles.link}>СВЕЖАЯ ВЫПЕЧКА</NavLink>
					<NavLink className={styles.link}>ДЕСЕРТЫ</NavLink>
					<NavLink className={styles.link}>НАПИТКИ</NavLink>
				</ul>
				<button type="button" onClick={changeTabletMenu} className={cn(styles.wrapperLineMenu, {
					[styles.wrapperLineMenuActive]: tabletMenu
				})}>
					<div className={styles.wrapperLine}>
						<div className={cn(styles.line, {
							[styles.lineActive]: tabletMenu,
							[styles.lineActiveTop]: tabletMenu
						})}></div>
						<div className={cn(styles.line, {
							[styles.lineActive]: tabletMenu,
							[styles.lineActiveCentre]: tabletMenu
						})}></div>
						<div className={cn(styles.line, {
							[styles.lineActive]: tabletMenu,
							[styles.lineActiveBottom]: tabletMenu
						})}></div>
					</div>
					<p className={cn(styles.menu, {
						[styles.menuActive]: tabletMenu
					})}>{ tabletMenu ? 'ЗАКРЫТЬ' : 'МЕНЮ' }</p>
				</button>
				<div className={styles.wrapperHelpers}>
					<label className={styles.label} htmlFor="search">
						<input placeholder="Поиск блюда" id="search" className={styles.input} name='name' type='text'/>
						<img className={styles.search} src="../../../public/Search.svg" alt="Поиск"/>
					</label>
					<NavLink>
						<img src="../../../public/Cabinet.svg" alt="Личный кабинет"/>
					</NavLink>
					<NavLink>
						<img src="../../../public/Basket.svg" alt="Корзина"/>
					</NavLink>
				</div>
			</div>
			{tabletMenu && <TabletMenu/>}
		</header>
	);
};

export default Header;