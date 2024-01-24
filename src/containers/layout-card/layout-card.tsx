import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { cardActions, getCard } from "../../services/reducers/card-reducer";
import Headling from "../../components/headling/headling";
import styles from './layout-card.module.css'
import ButtonBasket from "../../components/button-basket/button-basket";
import cn from "classnames";
import { addDish } from "../../services/reducers/basket-reducer";
import ErrorMessageInfo from "../../components/error-message-info/error-message-info";


const LayoutCard = () => {

	const { card, cardErrorMessage } = useSelector((state: RootState) => state.card)
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const [numState, setNumState] = useState(1);

	const addBasketProduct = (name: string, count: 1) => {
		dispatch(addDish({name, count}));
	}

	const changeState = (num) => {
		if (numState === 1 && num === -1) {
			return;
		} else {
			setNumState(state => state + num)
		}
	}

	useEffect(() => {
		dispatch(cardActions.clearCardMessage());
		dispatch(getCard(+id));
	}, [id])

	return (
		<>
			{cardErrorMessage && <ErrorMessageInfo error={cardErrorMessage}/>}
			{card.id &&
                <div className={styles.LayoutCard}>
                    <Headling children={card.name}/>
                    <div className={styles.wrapperLayoutCard}>
                        <img className={styles.img} src={card.img} alt={card.name}/>
                        <div className={styles.wrapperRightMenu}>
                            <p className={styles.paragraph}>Описание:</p>
                            <p className={styles.description}>{card.description}</p>
                            <div className={styles.wrapperPrice}>
                                <div className={styles.wrapperName}>
                                    <p className={styles.name}>{card.name}</p>
                                    <p className={styles.weight}>{`${card.weight} г`}</p>
                                </div>
                                <div className={styles.wrapperCounter}>
                                    <button className={cn(styles.buttonCounter, styles.buttonCounterLeft)} onClick={() => changeState(-1)}>
                                        <img src="/minusCounter.svg" alt="Минус"/>
                                    </button>
                                    <p className={styles.count}>{`${numState} шт`}</p>
                                    <button className={cn(styles.buttonCounter, styles.buttonCounterRight)} onClick={() => changeState(1)}>
                                        <img src="/plusCounter.svg" alt="Плюс"/>
                                    </button>
                                </div>
                                <p className={styles.price}>{`${card.price} ₽`}</p>
                                <ButtonBasket className={styles.basket} addBasketProduct={addBasketProduct} name={card.name} count={numState}/>
                            </div>
                        </div>
                    </div>
                </div>}
		</>
	)
}

export default LayoutCard;