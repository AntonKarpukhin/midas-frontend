import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types.ts";
import { useEffect } from "react";
import { getHistoryOrders } from "../../services/reducers/history-orders-reducer.ts";
import { Link, useNavigate } from "react-router-dom";
import styles from './layout-history-orders.module.css';

const LayoutHistoryOrders = () => {

	const {orders} = useSelector((state: RootState) => state.history);
	const {jwt} = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		return date.toLocaleDateString( 'ru-RU', options );
	};

	useEffect( () => {
		if (!jwt) {
			navigate('/')
		}
		dispatch(getHistoryOrders());
	}, [] );

	return (
		<div className={styles.LayoutHistoryOrders}>
			<h2 className={styles.title}>Мои заказы</h2>
			{orders.length === 0 && <p className={styles.noAddProduct}>Заказов не было</p>}
			<div className={styles.wrapper}>
				{orders && orders.map(item => {
					return (
						<Link key={ item.id } to={ `/orders/${ item.id }` } className={styles.link}>
							<p className={styles.number}>Номер заказа № <span className={styles.span}>{ item.id }</span></p>
							<p className={styles.date}>Дата заказа <br/>{ formatDate (item.createdAt)}</p>
						</Link>
					)
				} ) }
			</div>
		</div>
	)
}

export default LayoutHistoryOrders;


