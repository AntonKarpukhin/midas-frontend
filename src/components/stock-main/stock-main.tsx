import cn from "classnames";
import styles from './stock-main.module.css';
import ButtonBasket from "../button-basket/button-basket";
import { StockMainProps } from "./stock-main.props";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import numberFormat from "../../utils/number-format";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store/store-types.ts";

const StockMain = ({menu,  className, addBasketProduct, ...props}: StockMainProps) => {

	const menu1 = menu[0];
	const menu2 = menu[1];
	const navigate = useNavigate();
	const {jwt} = useSelector((state: RootState) => state.auth)

	const onClickProduct = (e: MouseEvent) => {
		const target = e.target as typeof e.target & HTMLDivElement;
		const nodeName = target.nodeName;
		if (nodeName === 'BUTTON' || nodeName === 'path' || nodeName === 'svg') {
			return;
		} else {
			navigate('/catalog/stock');
		}

	}

	return (
		menu && menu1 && menu2 &&
        <div className={cn(styles.StockMain, className)} {...props}>

            <div className={styles.wrapperDelivery}>
                <p className={styles.title}>Доставка готовой еды из фермерских продуктов!</p>
                <img className={styles.smallDot} src="/dots.svg" alt="Точки"/>
                <div className={styles.contacts}>
                    <a className={styles.tel} href="tel:+79999999999">+7 (999) 999-99-99</a>
                    <a className={styles.email} href="mailto:delivery@midas.rest">delivery@midas.rest</a>
                </div>


					<div className={styles.wrapperMenu2}>
                        <div className={styles.link} onClick={onClickProduct}>
							<img src={menu2.img} alt={menu2.name}/>
							<p className={styles.menu2Name}>{menu2.name}</p>
							<p className={styles.menu2Weight}>{`${menu2.weight} г`}</p>
							<div  className={styles.menu2WrapperPrice}>
								<p className={styles.menu2Price}>{`${numberFormat(menu2.price)} ₽`}</p>
								<ButtonBasket addBasketProduct={addBasketProduct} name={menu2.name} count={1} jwt={jwt}/>
							</div>
                        </div>
					</div>
            </div>

			<div className={styles.wrapperMenu1}>
				<img className={styles.img1} src={menu1.img} alt={menu1.name}/>
                <div className={styles.link}  onClick={onClickProduct}>
					<div className={styles.subWrapperMenu1}>
						<p className={styles.menu1Name}>{menu1.name}</p>
						<p className={styles.menu1Weight}>{`${menu1.weight} г`}</p>
						<p className={styles.menu1Description}>{menu1.description}</p>
						<div className={styles.menu1WrapperPrice}>
							<p className={styles.menu1Price}>{`${numberFormat(menu1.price)} ₽`}</p>
							<ButtonBasket addBasketProduct={addBasketProduct} name={menu1.name} count={1} jwt={jwt}/>
						</div>
					</div>
                </div>
			</div>

        </div>
	)
}


export default StockMain;