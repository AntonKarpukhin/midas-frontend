import { FormEvent, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import cn from 'classnames';
import styles from './layout-placing-order-page.module.css';
import { FormInterface } from "../../interfaces/form.interface.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types.ts";
import { getProfile } from "../../services/reducers/user-reducer.ts";
import { postOrder } from "../../services/reducers/order-reducer.ts";
import { PostOrderInterface } from "../../interfaces/post-order.interface.ts";
import { checkMessageError, validateData } from "../../utils/validate.tsx";

const LayoutPlacingOrderPage = () => {

	const [payMethod, setPayMethod] = useState<string>('cash');
	const [deliveryMethod, setDeliveryMethod] = useState<string>('pickup');
	const { basket, counter } = useSelector((state: RootState) => state.basket);
	const user = useSelector((state: RootState) => state.profile);
	const {orderErrorMessage} = useSelector((state: RootState) => state.order)
	const [error, setError] = useState<string>('');

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getProfile());
	}, [])

	useEffect(() => {
		const path = localStorage.getItem('path');
		if (path !== 'basket') {
			navigate('/');
		}
	}, [])


	const onSendOrder = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & FormInterface;

		const { username, phone, email, house, room, street } = target;

		const order: PostOrderInterface = {
			username: username!.value,
			phone: phone!.value.trim(),
			email: email!.value,
			house: house!.value.trim(),
			room: room!.value.trim(),
			street: street!.value.trim(),
			userId: user.id!,
			counter: counter || 0,
			deliveryMethod,
			dishes: basket
		}

		const validatedData = validateData(order);

		if (typeof validatedData === 'object') {
			dispatch(postOrder(order));
			localStorage.setItem('path', 'placing');
			navigate('/thanks');
		} else {
			setError(checkMessageError(validatedData))
		}
	}

	const onChangeDeliveryMethod = (s: string) => {
		setPayMethod(s);
	}

	return (
		user.username &&
		<div className={styles.LayoutPlacingOrderPage}>
			<h2 className={styles.title}>Оформление заказа</h2>

			<form className={styles.form} onSubmit={onSendOrder}>
				<div className={styles.wrapperContact1}>
					<p className={styles.titleContact1}>01. Контактные данные</p>
					<div className={styles.line}></div>
					<div className={styles.wrapperInputContact1}>
						<Input
							appearance={'big'}
							type={'text'}
							name={'username'}
							labelName={'Имя'}
							initialValue={user.username}
							read={true}
						/>
						<Input
							appearance={'big'}
							type={'tel'}
							name={'phone'}
							labelName={'Телефон'}
							initialValue={user.phone}
						/>
						<Input
							appearance={'big'}
							type={'email'}
							name={'email'}
							labelName={'Почта'}
							initialValue={user.email}
                            read={true}
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
							initialValue={user.street}
						/>
						<div className={styles.subWrapperInputContact2}>
							<Input
								appearance={'small'}
								type={'text'}
								name={'house'}
								labelName={'Дом'}
								initialValue={user.house}
							/>
							<Input
								appearance={'small'}
								type={'text'}
								name={'room'}
								labelName={'Квартира'}
								initialValue={user.room}
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
				{orderErrorMessage || error && <div style={{color: 'red', marginTop: '20px'}}>{orderErrorMessage || error}</div>}
			</form>

		</div>
	)
}


export default LayoutPlacingOrderPage;