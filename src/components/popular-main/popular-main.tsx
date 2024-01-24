
import cn from 'classnames';
import styles from './popular-main.module.css';
import { PopularMainProps } from "./popular-main.props";
import CatalogCard from "../catalog-card/catalog-card";
import { MouseEvent, useEffect, useState } from "react";
import useResize from "../../hooks/use-resize";
import { useNavigate } from "react-router-dom";
import { addDish } from "../../services/reducers/basket-reducer";
import { AppDispatch } from "../../services/store/store-types";
import { useDispatch } from "react-redux";


const PopularMain = ({catalog}: PopularMainProps) => {

	const [button, setButton] = useState<boolean>(false);
	const [viewCatalog, setViewCatalog] = useState(catalog)
	const { width } = useResize();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (width < 759) {
			setButton(true)
			setViewCatalog(catalog => catalog.slice(0, 8))
		} else {
			setButton(false)
			setViewCatalog(catalog)
		}
	}, [width])

	const onViewCatalog = () => {
		setViewCatalog(catalog);
		setButton(false);
	}

	const onClickProduct = (e: MouseEvent, id: number) => {
		const target = e.target as typeof e.target & HTMLLinkElement;
		const nodeName = target.nodeName;
		if (nodeName === 'BUTTON' || nodeName === 'path' || nodeName === 'svg') {
			return;
		} else {
			navigate(`/card/${id}`);
		}
	}

	const addBasketProduct = (name: string, count: 1, e: MouseEvent) => {
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
					catalog && width > 759 &&
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
					||
					width < 759 && viewCatalog &&
					viewCatalog.map(res =>
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
							onClickProduct={onClickProduct}/>)
				}
			</div>
			{
				button &&
				<button className={styles.button} onClick={onViewCatalog}>Показать еще</button>
			}
		</div>
	)
}

export default PopularMain;