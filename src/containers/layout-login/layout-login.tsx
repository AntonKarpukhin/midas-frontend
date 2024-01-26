import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import cn from "classnames";
import styles from "./layout-login.module.css";
import { FormInterface } from "../../interfaces/form.interface";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store-types";
import { login, authActions } from "../../services/reducers/auth-reducer";

const LayoutLogin = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { errorMessage } = useSelector((state: RootState) => state.auth);
	const {jwt} = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (jwt) {
			navigate('/profile');
		}
	}, [jwt])

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(authActions.clearError())
		const target = e.target as typeof e.target & FormInterface;
		const { username, password } = target;
		if (username && password) await sendLogin(username.value, password.value);
	}

	const sendLogin = async (name: string, password: string) => {
		dispatch(login({
			username: name,
			password: password
		}));
	}

	return (
		<div className={ styles.LayoutLogin }>
			<h2 className={ styles.title }>Вход</h2>
			<div className={styles.wrapperInfo}>
				<p className={ styles.info }> Имя - <span className={styles.span}>test1</span> или <span className={styles.span}>test2</span>.</p>
				<p className={ styles.info }> Пароль - <span className={styles.span}>test1</span> или <span className={styles.span}>test2</span>.</p>
			</div>
			<form className={ styles.form } onSubmit={ submit }>
				<Input
					appearance={ 'big' }
					type={ 'text' }
					name={ 'username' }
					labelName={ 'Имя' }
				/>
				<Input
					appearance={ 'big' }
					type={ 'password' }
					name={ 'password' }
					labelName={ 'Пароль' }
				/>
				<Button text={ 'Вход' } appearance={ 'yellow' } type={ 'submit' }/>
				<Link className={ styles.buttonSinIn } to={ '/registration' }>Зарегистрироваться</Link>
				<p className={ styles.paragraph }>Зарегистрируйтесь, чтобы оформить заказ.</p>
				{ errorMessage ? <p className={ styles.error }>{ errorMessage }</p> : null }
			</form>
			<img className={ cn( styles.img, styles.imgLeft ) } src="/plateLeft.png" alt="Блюдо"/>
			<img className={ cn( styles.img, styles.imgRight ) } src="/plateRight.png" alt="Блюдо"/>
		</div>
	)
}

export default LayoutLogin;