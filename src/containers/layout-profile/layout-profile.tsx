import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { FormEvent, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./layout-profile.module.css";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../services/reducers/user-reducer";
import { FormInterface } from "../../interfaces/form.interface";
import { authActions } from "../../services/reducers/auth-reducer";
import { Link, useNavigate } from 'react-router-dom'
import { checkMessageError, validateData } from "../../utils/validate.tsx";

const LayoutProfile = () => {

	const profile = useSelector((state: RootState) => state.profile);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const {jwt} = useSelector((state: RootState) => state.auth);
	const [error, setError] = useState<string>('');
	const [updateMessage, setUpdateMessage] = useState<string | null>('');

	useEffect(() => {
		dispatch(getProfile());
	}, [])

	useEffect(() => {
		if (!jwt) {
			navigate('/login')
		}
	}, [jwt])

	const onChangeProfile = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & FormInterface;

		const { username, password, phone, email, house, room, street } = target;

		const data = {
			username: username!.value.trim(),
			password: password!.value.trim() === '' ? null : password!.value.trim(),
			phone: phone!.value.trim(),
			email: email!.value.trim(),
			house: house!.value.trim(),
			room: room!.value.trim(),
			street: street!.value.trim(),
		};

		const validatedData = validateData(data);

		if (typeof validatedData === 'object') {
			dispatch(updateProfile(validatedData));
			setUpdateMessage('Данные Вашего профиля обновлены');
			setTimeout(() => {
				setUpdateMessage(null)
			}, 3000)
		} else {
			setError(checkMessageError(validatedData))
		}
	};

	const onLogOut = () => {
		dispatch(authActions.logout());
		navigate('/')
	}

	return (
		profile.username && <div className={styles.LayoutLogin}>
			<h2 className={styles.title}>Личный кабинет</h2>
				<form className={ styles.form } onSubmit={ onChangeProfile }>
					<Input
						appearance={ 'big' }
						type={ 'text' }
						name={ 'username' }
						labelName={ 'Имя' }
						initialValue={ profile.username }
					/>
					<Input
						appearance={ 'big' }
						type={ 'password' }
						name={ 'password' }
						labelName={ 'Пароль' }
						initialValue={ profile.password }
					/>
					<Input
						appearance={ 'big' }
						type={ 'email' }
						name={ 'email' }
						labelName={ 'Почта' }
						initialValue={ profile.email }
					/>
					<Input
						appearance={ 'big' }
						type={ 'tel' }
						name={ 'phone' }
						labelName={ 'Телефон' }
						initialValue={ profile.phone }
					/>
					<Input
						appearance={ 'big' }
						type={ 'text' }
						name={ 'street' }
						labelName={ 'Улица' }
						initialValue={ profile.street }
					/>
					<div className={ styles.wrapperRoom }>
						<Input
							appearance={ 'small' }
							type={ 'text' }
							name={ 'house' }
							labelName={ 'Дом' }
							initialValue={ profile.house }
						/>
						<Input
							appearance={ 'small' }
							type={ 'text' }
							name={ 'room' }
							labelName={ 'Квартира' }
							initialValue={ profile.room }
						/>
					</div>
					<div className={ styles.wrapperButton }>
						<button className={ styles.buttonExit } type={ 'button' } onClick={ onLogOut }>
							Выход
						</button>
						<Button text={ 'Изменить' } appearance={ 'yellow' } type={ 'submit' }/>
					</div>
					{ <div style={ { color: "red" } }>{ error !== '' ? error : null }</div> }
					{ <div style={ { color: "yellow" } }>{ updateMessage !== '' ? updateMessage : null }</div> }
				<Link to={'/orders'} className={styles.history}>История заказов</Link>
				</form>
            <img className={ cn( styles.img, styles.imgLeft ) } src="/plateLeft.png" alt="Блюдо"/>
            <img className={ cn( styles.img, styles.imgRight ) } src="/plateRight.png" alt="Блюдо"/>
        </div>
	)
}

export default LayoutProfile;