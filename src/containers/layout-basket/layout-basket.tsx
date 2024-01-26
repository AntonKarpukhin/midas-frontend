import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { addDish, basketActions, deleteDish, getAllDish } from "../../services/reducers/basket-reducer";
import Button from "../../components/button/button";
import BasketCard from "../../components/basket-card/basket-card";
import styles from './layout-basket.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import numberFormat from "../../utils/number-format";
import ErrorMessageInfo from "../../components/error-message-info/error-message-info";

const LayoutBasket = () => {
	const {jwt} = useSelector((state: RootState) => state.auth)
	const { basket, counter, basketErrorMessage } = useSelector((state: RootState) => state.basket)
	const dispatch = useDispatch<AppDispatch>();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!jwt && pathname === '/basket') {
			navigate('/login')
		} else {
			navigate('/basket')
		}
	}, [pathname])

	useEffect(() => {
		dispatch(basketActions.clearBasketMessage());
		dispatch(getAllDish());
	}, [])

	const deleteProduct = (name: string) => {
		dispatch(deleteDish(name))
	}

	const onChangeProduct = (name: string, count: number) => {
		dispatch(addDish({name, count}))
	}

	const onPlacingOrder = () => {
		localStorage.setItem('path', 'basket')
		navigate('/placing');
	}

	return (
		<div className={styles.LayoutBasket}>
			<h2 className={styles.title}>Корзина <span className={styles.span}>{ `${ basket.length } шт` }</span></h2>
			{basketErrorMessage && <ErrorMessageInfo error={basketErrorMessage}/>}
			<div>
				<div></div>
				<div className={styles.wrapperItem}>
					{
						basket &&
						basket.map(item => <BasketCard key={item.name} card={item} deleteProduct={deleteProduct} changeProduct={onChangeProduct}/>)
					}
				</div>
			</div>
			{basket.length === 0 && <p className={styles.noAddProduct}>Товары пока не добавлены</p>}
			<div className={styles.wrapperPrice}>
				<div className={styles.wrapperSum}>
					<p className={styles.total}>Итого к оплате:</p>
					<p className={styles.fullSum}>{ `${ numberFormat(counter ? counter : 0) } ₽` }</p>
				</div>
				<Button text={'Оформить заказ'} appearance={'yellow'} onClick={onPlacingOrder}/>
			</div>
		</div>
	)
}

export default LayoutBasket;