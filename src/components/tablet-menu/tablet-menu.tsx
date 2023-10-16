import styles from './tablet-menu.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import useResize from '../../hooks/use-resize';

const TabletMenu = () => {

	const [accordion, setAccordion] = useState<boolean>(true);
	const [hot, setHot] = useState<boolean>(true);
	const [cold, setCold] = useState<boolean>(true);
	const {width} = useResize();

	useEffect(() => {
		checkWidth();
	}, []);

	useEffect(() => {
		checkWidth();
	}, [width]);

	const changeAccordion = (a) => {
		if (width > 767) return;
		if (a === 0) {
			setHot(item => !item);
			setCold(false);
			setAccordion(true);
		} else {
			setHot(false);
			setCold(item => !item);
			setAccordion(true);
		}
	};

	const checkWidth = () => {
		if (width > 767) {
			setAccordion(true);
			setHot(true);
			setCold(true);
		} else {
			setAccordion(false);
			setHot(false);
			setCold(false);
		}
	};

	return (
		<div className={styles.wrapper} style={{color: 'white'}}>
			<input placeholder="Поиск блюда" id="search" className={styles.input} name='name' type='text'/>
			<button className={styles.button} type='button'>
				<p className={styles.buttonP}>30%</p>
				<div className={styles.wrapperSalle}>
					<p className={styles.buttonSalle}>Акции</p>
					<img src="../../../public/Hot.svg" alt="Акция"/>
				</div>
				<p className={styles.buttonP}>20%</p>
			</button>
			<div className={styles.wrapperHotCold}>
				<NavLink className={styles.salesSmall}>
					<img className={styles.smallImg} src="../../../public/Hot.svg" alt="Акция"/>
					<p className={styles.smallP}>Акции</p>
				</NavLink>
				<ul className={cn(styles.ul, styles.ulCold)}>
					<button onClick={() => changeAccordion(0)} className={styles.smallWrapper} type="button">
						<svg className={cn(styles.svg, {
							[styles.svgActive]: accordion && hot
						})} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.19884 4.6013e-07L5.71295 4.51411L4.51411 5.71295L0 1.19884L1.19884 4.6013e-07Z" fill="white"/>
							<path d="M9.03 1.19884L4.51589 5.71295L3.31705 4.51411L7.83116 0L9.03 1.19884Z" fill="white"/>
						</svg>
						<h2 className={cn(styles.h2, {
							[styles.h2Active]: accordion && hot
						})}>ГОРЯЧЕЕ</h2>
						<p className={styles.smallCounter}>3 шт</p>
					</button>
					{
						accordion && hot &&
						<div className={styles.wrapperLink}>
							<NavLink className={styles.link}>
								<img className={styles.img} src="../../../public/tablet-menu/Hot.svg" alt="Горячие блюда"/>
								<p className={styles.linkP}>Горячие блюда</p>
							</NavLink>
							<NavLink className={styles.link}>
								<img className={styles.img} src="../../../public/tablet-menu/Soups.svg" alt="Супы"/>
								<p className={styles.linkP}>Супы</p>
							</NavLink>
							<NavLink className={styles.link}>
								<img className={styles.img} src="../../../public/tablet-menu/Khinkali.svg" alt="Хинкали"/>
								<p className={styles.linkP}>Хинкали</p>
							</NavLink>
						</div>
					}
				</ul>
				<ul className={cn(styles.ul, styles.ulCold)}>
					<button onClick={() => changeAccordion(1)} className={styles.smallWrapper} type="button">
						<svg className={cn(styles.svg, {
							[styles.svgActive]: accordion && cold
						})} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.19884 4.6013e-07L5.71295 4.51411L4.51411 5.71295L0 1.19884L1.19884 4.6013e-07Z" fill="white"/>
							<path d="M9.03 1.19884L4.51589 5.71295L3.31705 4.51411L7.83116 0L9.03 1.19884Z" fill="white"/>
						</svg>
						<h2 className={cn(styles.h2, {
							[styles.h2Active]: accordion && cold
						})}>ХОЛОДНОЕ</h2>
						<p className={styles.smallCounter}>3 шт</p>
					</button>
					{
						accordion && cold &&
						<div className={styles.wrapperLink}>
							<NavLink className={styles.link}>
								<img className={styles.img} src="../../../public/tablet-menu/Cold.svg" alt="Холодные закуски"/>
								<p className={styles.linkP}>Холодные закуски</p>
							</NavLink>
							<NavLink className={styles.link}>
								<img className={styles.img} src="../../../public/tablet-menu/Salads.svg" alt="Салаты"/>
								<p className={styles.linkP}>Салаты</p>
							</NavLink>
							<NavLink className={styles.link}>
								<img className={styles.img} src="../../../public/tablet-menu/Beverages.svg" alt="Соусы"/>
								<p className={styles.linkP}>Соусы</p>
							</NavLink>
						</div>
					}
				</ul>
			</div>
			<div className={styles.wrapperBakery}>
				<ul className={cn(styles.ul, styles.ulCold)}>
					<NavLink className={styles.link}>
						<img className={styles.img} src="../../../public/tablet-menu/Bakery.svg" alt="Свежая выпечка"/>
						<p className={styles.linkP}>Свежая выпечка</p>
					</NavLink>
					<NavLink className={styles.link}>
						<img className={styles.img} src="../../../public/tablet-menu/Dessert.svg" alt="Десерты"/>
						<p className={styles.linkP}>Десерты</p>
					</NavLink>
					<NavLink className={styles.link}>
						<img className={styles.img} src="../../../public/tablet-menu/Beverages.svg" alt="Напитки"/>
						<p className={styles.linkP}>Напитки</p>
					</NavLink>
				</ul>
			</div>
		</div>
	);
};

export default TabletMenu;