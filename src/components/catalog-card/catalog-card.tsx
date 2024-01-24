import { CatalogCardProps } from "./catalog-card.props";
import styles from './catalog-card.module.css';
import { Link } from "react-router-dom";
import numberFormat from "../../utils/number-format";

const CatalogCard = ({name, description, img, weight, price, oldPrice, id, addBasketProduct, onClickProduct}: CatalogCardProps) => {

	const descr = description.length > 100 ? `${description.slice(0, 100)}...` : description;

	return (
		<div  onClick={(e) => addBasketProduct(name, 1, e)}>
			<Link className={styles.CatalogCard} onClick={(e) => onClickProduct(e, id)}>
				<img className={styles.img} src={img} alt={name}/>
				<p className={styles.title}>{name}</p>
				<div className={styles.wrapperWeight}>
					<p className={styles.weight}>{weight} <span className={styles.spanWeight}>г</span></p>
				</div>
				<p className={styles.description}>{descr}</p>
				<div className={styles.wrapperBasket}>
					<div>
						{oldPrice === 0 ? null : <p className={styles.oldPrice}>{oldPrice} <span className={styles.spanOldPrice}>₽</span></p>}
						<p className={styles.price}>{numberFormat(price)} <span className={styles.spanPrice}>₽</span></p>
					</div>
					<button type='button' className={styles.wrapperBasketIcon}>
						<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.28475 24.1011L1.57399 13.3228H0V7.23318H6.00448L8.94843 0L10.639 0.657562L7.9574 7.26177H18.0135L15.361 0.657562L17.0516 0L19.9955 7.23318H26V13.3228H24.426L21.7152 24.1011H4.28475ZM20.3161 22.3285L22.5897 13.3514H3.43946L5.71301 22.3285H20.3161ZM24.1928 11.5502V9.06291H1.83632V11.5502H24.1928Z" fill="black"/>
							<path d="M13.9327 14.838H12.0963V21.2707H13.9327V14.838Z" fill="black"/>
							<path d="M17.4305 14.838H15.5942V21.2707H17.4305V14.838Z" fill="black"/>
							<path d="M10.435 14.838H8.59865V21.2707H10.435V14.838Z" fill="black"/>
						</svg>

					</button>
				</div>
			</Link>
		</div>
	)
}

export default CatalogCard;