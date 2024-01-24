import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import cn from 'classnames';
import styles from './layout-placing-order-page.module.css';

const LayoutPlacingOrderPage = () => {

	const [payMethod, setPayMethod] = useState<string>('');
	const [deliveryMethod, setDeliveryMethod] = useState<string>('');

	const navigate = useNavigate();

	useEffect(() => {
		const path = localStorage.getItem('path');
		if (path !== 'basket') {
			navigate('/');
		}
	}, [])

	const onSendOrder = () => {
		localStorage.setItem('path', 'placing');
		navigate('/thanks');
	}

	const onChangeDeliveryMethod = (s: string) => {
		setPayMethod(s);
	}


	return (
		<div className={styles.LayoutPlacingOrderPage}>
			<h2 className={styles.title}>Оформление заказа</h2>

			<form className={styles.form}>
				<div className={styles.wrapperContact1}>
					<p className={styles.titleContact1}>01. Контактные данные</p>
					<div className={styles.line}></div>
					<div className={styles.wrapperInputContact1}>
						<Input
							appearance={'big'}
							type={'text'}
							name={'username'}
							labelName={'Имя'}
						/>
						<Input
							appearance={'big'}
							type={'tel'}
							name={'phone'}
							labelName={'Телефон'}
						/>
						<Input
							appearance={'big'}
							type={'email'}
							name={'email'}
							labelName={'Почта'}
						/>
					</div>
				</div>

				<div className={styles.wrapperContact2}>
					<p className={styles.titleContact2}>02. Способ доставки</p>
					<div className={styles.line}></div>

					<div className={styles.wrapperDelivery}>
						<div onClick={() => setDeliveryMethod('pickup')} className={cn(styles.wrapperMethod, {
							[styles.activeWrapperMethod]: deliveryMethod === 'pickup'
						})}>
							<p className={styles.deliveryTitle}>Бесконтактная доставка</p>
							<p className={styles.deliverySubTitle}>
								Доставка по Москве в пределах МКАД Осуществляется: ежедневно с 12:00 до 00:00,  Диапозон времени: от 1 до 1.5 часов
							</p>
						</div>
						<div onClick={() => setDeliveryMethod('home')} className={cn(styles.wrapperMethod, {
							[styles.activeWrapperMethod]: deliveryMethod === 'home'
						})}>
							<p className={styles.deliveryTitle}>Самовывоз</p>
							<p className={styles.deliverySubTitle}>Доступен с 12:00 до 00:00  По адресу ул. Улофа Пальме 5с2</p>
						</div>
					</div>

					<div className={styles.wrapperInputContact2}>
						<p className={styles.subTitleContact2}>Адрес доставки</p>
						<Input
							appearance={'big'}
							type={'text'}
							name={'street'}
							labelName={'Улица'}
						/>
						<div className={styles.subWrapperInputContact2}>
							<Input
								appearance={'small'}
								type={'text'}
								name={'house'}
								labelName={'Дом'}
							/>
							<Input
								appearance={'small'}
								type={'text'}
								name={'room'}
								labelName={'Квартира'}
							/>
						</div>
					</div>
				</div>

				<div className={styles.wrapperContact3}>
					<p className={styles.titleContact3}>03. Оплата</p>
					<div className={styles.line}></div>
					<div className={styles.wrapperPayload}>
						<div onClick={() => onChangeDeliveryMethod('cash')} className={cn(styles.wrapperPay, {
							[styles.active]: payMethod === 'cash'
						})}>
							<div className={cn(styles.bol, {
								[styles.activeBack]: payMethod === 'cash'
							})}></div>
							<p className={cn(styles.payTitle, {
								[styles.active]: payMethod === 'cash'
							})}>Наличными курьеру</p>
						</div>
						<div onClick={() => onChangeDeliveryMethod('online')} className={cn(styles.wrapperPay, {
							[styles.active]: payMethod === 'online'
						})}>
							<div className={cn(styles.bol, {
								[styles.activeBack]: payMethod === 'online'
							})}></div>
							<p className={cn(styles.payTitle, {
								[styles.active]: payMethod === 'online'
							})}>Картой курьеру</p>
						</div>
					</div>
				</div>
				<Button text={'Подтвердить заказ'} appearance={'yellow'}/>
			</form>

		</div>
	)
}


export default LayoutPlacingOrderPage;