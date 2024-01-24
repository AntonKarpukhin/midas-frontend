import { BasketCardProps } from "./basket-card.props";
import styles from './basket-card.module.css';
import cn from "classnames";
import numberFormat from "../../utils/number-format";


const BasketCard = ({card, deleteProduct, changeProduct}: BasketCardProps) => {

	return (
		card &&
        <div className={styles.BasketCard}>
            <img className={styles.img} src={card.img} alt={card.name}/>
            <div className={styles.wrapperName}>
                <p className={styles.name}>{card.name}</p>
                <p className={styles.weight}>{`${card.weight} г`}</p>
            </div>
            <div className={styles.wrapperPrice}>
				<p className={styles.namePrice}>Цена:</p>
                <p className={styles.price}>{`${numberFormat(card.price)} ₽`}</p>
			</div>
            <div className={styles.wrapperCounter}>
                <button className={cn(styles.buttonCounter, styles.buttonCounterLeft)} type={'button'} onClick={() => changeProduct(card.name, -1)}>
                    <img src="/minusCounter.svg" alt="Минус"/>
                </button>
                <p className={styles.count}>{ `${card.count} шт` }</p>
                <button className={cn(styles.buttonCounter, styles.buttonCounterRight)} type={'button'} onClick={() => changeProduct(card.name, 1)}>
                    <img src="/plusCounter.svg" alt="Плюс"/>
                </button>
            </div>
            <div className={styles.wrapperSumPrice}>
                <p className={styles.nameSumPrice}>Сумма:</p>
                <p className={styles.sumPrice}>{`${numberFormat(card.sumPrice)} ₽`}</p>
			</div>
            <button className={styles.button} type={'button'} onClick={() => deleteProduct(card.name)}>
                <img src="/cross.svg" alt="Крестик"/>
			</button>
        </div>
	)
}

export default BasketCard;