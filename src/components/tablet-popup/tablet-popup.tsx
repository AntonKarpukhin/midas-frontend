import styles from './tablet-popup.module.css';
import cn from 'classnames';
import ReactDOM from "react-dom";
import TabletItemLink from "../tablet-item-link/tablet-item-link";
import { Link } from "react-router-dom";

const modalRoot = document.getElementById("modals") as HTMLElement;

const TabletPopup = ({setModal}: {setModal: (s: boolean) => void}) => {

	return ReactDOM.createPortal((
		<div className={styles.TabletPopup}>
			<Link className={styles.wrapperSales} to={'/catalog/stock'} onClick={() => setModal(false)}>
				<p className={styles.salesCount}>30%</p>
				<div className={styles.wrapperStock}>
					<p className={styles.stockP}>Акции</p>
					<img src='/Hot.svg' alt="Акции"/>
				</div>
				<p className={styles.salesCount}>20%</p>
			</Link>
			<Link className={styles.wrapperStockSmall}  to={'/catalog/stock'} onClick={() => setModal(false)}>
				<img className={styles.phoneImg} src='/public/Hot.svg' alt="Акции"/>
				<p className={styles.stockP}>Акции</p>
			</Link>
			<div className={styles.wrapperHot}>
				<div>
					<div className={styles.line}></div>
					<button className={styles.button}>ГОРЯЧЕЕ</button>
				</div>
				<div className={styles.wrapperTablet}>
					<TabletItemLink name={'Горячие блюда'} img={'/tablet-menu/Hot.svg'} link={'/catalog/hot'} closeModal={setModal}/>
					<TabletItemLink name={'Супы'} img={'/tablet-menu/Soups.svg'} link={'/catalog/soups'} closeModal={setModal}/>
					<TabletItemLink name={'Хинкали'} img={'/tablet-menu/Khinkali.svg'} link={'/catalog/khinkali'} closeModal={setModal}/>
				</div>
			</div>
			<div className={styles.wrapperCold}>
				<div>
					<div className={styles.line}></div>
					<button className={styles.button}>ХОЛОДНОЕ</button>
				</div>
				<div className={styles.wrapperTablet}>
					<TabletItemLink name={'Холодные закуски'} img={'/tablet-menu/Cold.svg'} link={'/catalog/cold'} closeModal={setModal}/>
					<TabletItemLink name={'Салаты'} img={'/tablet-menu/Salads.svg'} link={'/catalog/salads'} closeModal={setModal}/>
				</div>
			</div>
			<div className={cn(styles.wrapperOther, styles.wrapperTablet)}>
				<div className={styles.line2}></div>
				<TabletItemLink name={'Свежая выпечка'} img={'/tablet-menu/Bakery.svg'} link={'/catalog/bakery'} closeModal={setModal}/>
				<div className={styles.line2}></div>
				<TabletItemLink name={'Десерты'} img={'/tablet-menu/Dessert.svg'} link={'/catalog/dessert'} closeModal={setModal}/>
				<div className={styles.line2}></div>
				<TabletItemLink name={'Напитки'} img={'/tablet-menu/Beverages.svg'} link={'/catalog/beverages'} closeModal={setModal}/>
				<div className={styles.line2}></div>
			</div>
		</div>
	), modalRoot)
}

export default TabletPopup;