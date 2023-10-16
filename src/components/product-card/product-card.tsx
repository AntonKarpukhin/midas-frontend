import { IProductCardTypes } from './product-card.types';
import { NavLink } from 'react-router-dom';
import styles from './product-card.module.css';


const ProductCard = (props: IProductCardTypes) => {
	return (
		<NavLink to={`/product/${props.id}`} className={styles.link}>
			<div className={styles.wrapper}>
				<div className={styles.img} style={{ backgroundImage: `url('${props.image}')` }}></div>
				<h3 className={styles.title}>{props.title}</h3>
				<div className={styles.calories}>
					{props.calories}&nbsp;
					<span>г</span>
				</div>
				<p className={styles.description}>{props.description}</p>
				<div className={styles.wrapperPrice}>
					<div className={styles.price}>
						{props.price}&nbsp;
						<span>₽</span>
					</div>
					<button className={styles.button} type='button'>
						<img src="../../../public/Basket-black.svg" alt="Иконка корзины"/>
					</button>
				</div>
			</div>
		</NavLink>
	);
};

export default ProductCard;