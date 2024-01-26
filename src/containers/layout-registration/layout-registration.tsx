import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./layout-registration.module.css";
import { FormInterface } from "../../interfaces/form.interface";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegistration } from "../../services/reducers/auth-reducer";

const LayoutRegistration = () => {

	const [validateInput, setValidateInput] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { errorMessage } = useSelector(( state: RootState) => state.auth);
	const {jwt} = useSelector((state: RootState) => state.auth);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & FormInterface;
		const { username, password, email } = target;
		if ((username && password && email) && (username?.value.length > 1 && password?.value.length > 3 && email?.value.length > 3)) {
			await sendRegistration(username!.value, password!.value, email!.value);
			setValidateInput('');
		} else {
			setValidateInput('Необходимо заполнить все поля');
		}
	}

	useEffect(() => {
		if (jwt) {
			navigate('/profile');
		}
	}, [jwt])

	const sendRegistration = async (name: string, password: string, email: string) => {
		dispatch(userRegistration({
			username: name,
			password: password,
			email: email
		}));
		setTimeout(() => {
			navigate('/')
		}, 500)
	}

	return (
		<div className={styles.LayoutLogin}>
			<h2 className={styles.title}>Регистрация</h2>
			<form className={styles.form} onSubmit={submit}>
				<Input
					appearance={'big'}
					type={'text'}
					name={'username'}
					labelName={'Имя'}
				/>
				<Input
					appearance={'big'}
					type={'password'}
					name={'password'}
					labelName={'Пароль'}
				/>
				<Input
					appearance={'big'}
					type={'email'}
					name={'email'}
					labelName={'Почта'}
				/>
				<Button text={'Регистрация'} appearance={'yellow'} type={'submit'}/>
				<Link className={styles.buttonSinIn} to={'/login'}>Уже покупали у нас?</Link>
				<p className={styles.paragraph}>Войдите в личный кабинет, и все ваши данный автоматически заполнятся</p>
				{validateInput || errorMessage ? <p className={styles.error}>{errorMessage || validateInput}</p> : null}
			</form>
			<img className={cn(styles.img, styles.imgLeft)} src="/plateLeft.png" alt="Блюдо"/>
			<img className={cn(styles.img, styles.imgRight)} src="/plateRight.png" alt="Блюдо"/>
		</div>
	)
}

export default LayoutRegistration;