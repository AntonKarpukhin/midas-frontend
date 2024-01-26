import CatalogCard from "../../components/catalog-card/catalog-card";
import styles from './layout-catalog.module.css';
import { MouseEvent } from "react";
import { addDish } from "../../services/reducers/basket-reducer";
import { AppDispatch } from "../../services/store/store-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Product } from "../../interfaces/product.interface.ts";

const LayoutCatalog = ({catalog, title}: {catalog: Product[], title: string}) => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const onClickProduct = (e: MouseEvent, id: number) => {
		const target = e.target as typeof e.target & HTMLDivElement;
		const nodeName = target.nodeName;

		if (nodeName === 'BUTTON' || nodeName === 'path' || nodeName === 'svg') {
			return;
		} else {
			navigate(`/card/${id}`);
		}
	}

	const addBasketProduct = (name: string, count: number, e: MouseEvent) => {
		count = 1;
		const target = e.target as typeof e.target & HTMLLinkElement;
		const nodeName = target.nodeName;

		if (nodeName === 'BUTTON' || nodeName === 'path' || nodeName === 'svg') {
			dispatch(addDish({name, count}));

		} else {
			return;
		}
	}

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.LayoutCatalog}>
				{catalog && catalog.map(res =>
					<CatalogCard
						key={res.id}
						id={res.id}
						name={res.name}
						description={res.description}
						price={res.price}
						oldPrice={res.oldPrice}
						img={res.img}
						weight={res.weight}
						addBasketProduct={addBasketProduct}
						onClickProduct={onClickProduct}/>)}
			</div>
		</div>
	)
}

export default LayoutCatalog;