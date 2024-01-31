import styles from './popular-main.module.css';
import { PopularMainProps } from "./popular-main.props";
import CatalogCard from "../catalog-card/catalog-card";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addDish } from "../../services/reducers/basket-reducer";
import { AppDispatch } from "../../services/store/store-types";
import { useDispatch } from "react-redux";

const PopularMain = ({catalog}: PopularMainProps) => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const onClickProduct = (e: MouseEvent, id: number) => {
		const target = e.target as typeof e.target & HTMLLinkElement;
		const nodeName = target.nodeName;
		if (nodeName === 'BUTTON' || nodeName === 'path' || nodeName === 'svg') {
			return;
		} else {
			navigate(`/card/${id}`);
		}
	}

	const addBasketProduct = (name: string, count: number, e: MouseEvent) => {
		count = 1
		const target = e.target as typeof e.target & HTMLLinkElement;
		const nodeName = target.nodeName;
		if (nodeName === 'BUTTON' || nodeName === 'path' || nodeName === 'svg') {
			dispatch(addDish({name, count}));
		} else {
			return;
		}

	}

	return (
		<div className={styles.PopularMain}>
			<h2 className={styles.title}>Популярные блюда</h2>
			<div className={styles.wrapper}>
				{
					catalog &&
					catalog.map(res =>
						<CatalogCard
							key={res.id}
							id={res.id} name={res.name}
							description={res.description}
							price={res.price}
							oldPrice={res.oldPrice}
							img={res.img}
							weight={res.weight}
							addBasketProduct={addBasketProduct}
							onClickProduct={onClickProduct}/>)
				}
			</div>
		</div>
	)
}

export default PopularMain;