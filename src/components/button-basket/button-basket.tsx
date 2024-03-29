import { ButtonBasketProps } from "./button-basket.props";
import cn from "classnames";
import styles from './button-basket.module.css';
import { useState } from "react";

const ButtonBasket = ({className, addBasketProduct, name, count, jwt, ...props}: ButtonBasketProps) => {

	const [activeButton, setActiveButton] = useState<boolean>(false);
	const [messageLogin, setMessageLogin] = useState<boolean>(true);

	const addBasket = (name: string, count: number) => {

		if (!jwt) {
			setMessageLogin(false)
			setTimeout(() => {
				setMessageLogin(true)
			}, 2000)
		} else {
			setMessageLogin(true)
		}

		addBasketProduct(name, count);
		setActiveButton(true);
		setTimeout(() => {
			setActiveButton(false);
		}, 300)
	}

	return (
		name && count &&
		<div className={styles.wrapper}>
			<button className={ cn( styles.buttonBasket, className, {
				[ styles.activeBasket ]: activeButton
			} ) } type='button' { ...props } onClick={ () => addBasket( name, count ) }>
				<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.28475 24.1011L1.57399 13.3228H0V7.23318H6.00448L8.94843 0L10.639 0.657562L7.9574 7.26177H18.0135L15.361 0.657562L17.0516 0L19.9955 7.23318H26V13.3228H24.426L21.7152 24.1011H4.28475ZM20.3161 22.3285L22.5897 13.3514H3.43946L5.71301 22.3285H20.3161ZM24.1928 11.5502V9.06291H1.83632V11.5502H24.1928Z"
						fill="black"/>
					<path d="M13.9327 14.838H12.0963V21.2707H13.9327V14.838Z" fill="black"/>
					<path d="M17.4305 14.838H15.5942V21.2707H17.4305V14.838Z" fill="black"/>
					<path d="M10.435 14.838H8.59865V21.2707H10.435V14.838Z" fill="black"/>
				</svg>
			</button>
			{ !messageLogin && <div className={ styles.info }><span>Войдите в ЛК</span>, <br/> для добавляния товаров</div> }
        </div>
	)
}


export default ButtonBasket;