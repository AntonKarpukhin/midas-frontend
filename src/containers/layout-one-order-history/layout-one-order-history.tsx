import styles from './layout-one-order-history.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types.ts";
import { gerOneHistoryOrder } from "../../services/reducers/history-orders-reducer.ts";
import HistoryCard from "../../components/history-card/history-card.tsx";
import { ProductHistory } from "../../interfaces/product-history.interface.ts";
import numberFormat from "../../utils/number-format.ts";


const LayoutOneOrderHistory = () => {

	const {id} = useParams();
	const { products } = useSelector((state: RootState) => state.history);
	const [fullPrice, setFullPrice] = useState<number>(0);
	const {jwt} = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const getFullPrice = (products: ProductHistory[]) => {
			return products.reduce((a, b) => {
				return a + b.sumPrice
			}, 0)
	};

	useEffect( () => {
		if (!jwt) {
			navigate('/')
		}
		if (id) {
			dispatch(gerOneHistoryOrder(+id));
		}
	}, [] );

	useEffect( () => {
		setFullPrice(getFullPrice(products));
	}, [products] );

	return (
		<div className={ styles.LayoutOneOrderHistory }>
			{ products && products.map( card => <HistoryCard key={ card.id } card={ card }/> ) }
			{ fullPrice &&
                <div className={ styles.wrapperSum }>
                    <p className={ styles.total }>Итого:</p>
                    <p className={ styles.fullSum }>{ `${ numberFormat( fullPrice ) } ₽` }</p>
                </div>
			}
		</div>
	)
}

export default LayoutOneOrderHistory;