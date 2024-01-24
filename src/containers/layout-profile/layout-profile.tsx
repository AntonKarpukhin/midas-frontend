import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { FormEvent, useEffect } from "react";
import cn from "classnames";
import styles from "./layout-profile.module.css";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile} from "../../services/reducers/user-reducer";
import { FormInterface } from "../../interfaces/form.interface";
import { authActions } from "../../services/reducers/auth-reducer";
import {useNavigate} from 'react-router-dom'

const LayoutProfile = () => {

	const profile = useSelector((state: RootState) => state.profile);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const {jwt} = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch])

	useEffect(() => {
		if (!jwt) {
			navigate('/login')
		}
	}, [jwt])

	const onChangeProfile = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & FormInterface;
		const data = {
			username: target.username?.value.trim(),
			password: target.password?.value.trim().length === 0 ? null : target.password?.value.trim(),
			email: target.email?.value.trim(),
			phone:target.phone?.value,
			street: target.street?.value.trim().length === 0 ? null : target.street?.value.trim(),
			house: target.house?.value.trim().length === 0 ? null : target.house?.value.trim(),
			room: target.room?.value.trim().length === 0 ? null : target.room?.value.trim(),
		}
		dispatch(updateProfile(data))
	}

	const onLogOut = () => {
		dispatch(authActions.logout());
		navigate('/')
	}

	return (
		profile.username && <div className={styles.LayoutLogin}>
			<h2 className={styles.title}>Личный кабинет</h2>
			<form className={styles.form} onSubmit={onChangeProfile}>
				<Input
					appearance={'big'}
					type={'text'}
					name={'username'}
					labelName={'Имя'}
					initialValue={profile.username}
				/>
				<Input
					appearance={'big'}
					type={'password'}
					name={'password'}
					labelName={'Пароль'}
					initialValue={profile.password}
				/>
				<Input
					appearance={'big'}
					type={'email'}
					name={'email'}
					labelName={'Почта'}
					initialValue={profile.email}
				/>
				<Input
					appearance={'big'}
					type={'phone'}
					name={'tel'}
					labelName={'Телефон'}
					initialValue={profile.phone}
				/>
				<Input
					appearance={'big'}
					type={'text'}
					name={'street'}
					labelName={'Улица'}
					initialValue={profile.street}
				/>
				<div className={styles.wrapperRoom}>
					<Input
						appearance={'small'}
						type={'text'}
						name={'house'}
						labelName={'Дом'}
						initialValue={profile.house}
					/>
					<Input
						appearance={'small'}
						type={'text'}
						name={'room'}
						labelName={'Квартира'}
						initialValue={profile.room}
					/>
				</div>
				<div className={styles.wrapperButton}>
					<button className={styles.buttonExit} type={'button'} onClick={onLogOut}>
						Выход
					</button>
					<Button text={'Изменить'} appearance={'yellow'} type={'submit'} />
				</div>

			</form>
			<img className={cn(styles.img, styles.imgLeft)} src="/plateLeft.png" alt="Блюдо" />
			<img className={cn(styles.img, styles.imgRight)} src="/plateRight.png" alt="Блюдо" />
		</div>
	)
}

export default LayoutProfile;