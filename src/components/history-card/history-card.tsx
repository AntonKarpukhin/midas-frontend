import { HistoryCardProps } from "./history-card.props.ts";
import styles from "./history-card.module.css";
import numberFormat from "../../utils/number-format.ts";

const HistoryCard = ( { card }: HistoryCardProps) => {
	return (
        <div className={styles.HistoryCard}>
            <img className={styles.img} src={card.img} alt={card.name}/>
            <div className={styles.wrapperName}>
                <p className={styles.name}>{card.name}</p>
                <p className={styles.weight}>{`${card.weight} г`}</p>
            </div>
            <div className={styles.wrapperPrice}>
                <p className={styles.namePrice}>Цена:</p>
                <p className={styles.price}>{`${numberFormat(card.price)} ₽`}</p>
            </div>
            <div className={styles.wrapperSumPrice}>
                <p className={styles.nameSumPrice}>Сумма:</p>
                <p className={styles.sumPrice}>{`${numberFormat(card.sumPrice)} ₽`}</p>
            </div>
			<div className={ styles.button }>
				<p className={ styles.nameCounter }>Кол-во:</p>
				{ card.count }
			</div>
		</div>
	)
}

export default HistoryCard;