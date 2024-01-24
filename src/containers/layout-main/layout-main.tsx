import StockMain from "../../components/stock-main/stock-main";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { getStockMenu, stockActions } from "../../services/reducers/stock-reducer";
import PopularMain from "../../components/popular-main/popular-main";
import { gerPopularMenu, popularActions } from "../../services/reducers/popular-reducer";
import styles from './layout-main.module.css';
import Slider from "../../components/slider/slider";
import { addDish } from "../../services/reducers/basket-reducer";
import ErrorMessageInfo from "../../components/error-message-info/error-message-info";


const LayoutMain = () => {

	const {stock, stockErrorMessage} = useSelector((state: RootState) => state.stock);
	const {popular, popularErrorMessage} = useSelector((state: RootState) => state.popular);

	const dispatch = useDispatch<AppDispatch>();

	const addBasketProduct = (name: string, count: 1) => {
		dispatch(addDish({name, count}));
	}

	useEffect(() => {
		dispatch(stockActions.clearStockMessage());
		dispatch(popularActions.clearPopularMessage());
		dispatch(getStockMenu());
		dispatch(gerPopularMenu());
	}, [])

	return (
		<main className={styles.LayoutMain}>
			{stockErrorMessage && <ErrorMessageInfo error={stockErrorMessage}/>}
			<StockMain menu={stock} addBasketProduct={addBasketProduct}/>
			{popularErrorMessage && <ErrorMessageInfo error={popularErrorMessage}/>}
			<PopularMain catalog={popular}/>
			<Slider/>
		</main>
	)
}

export default LayoutMain;