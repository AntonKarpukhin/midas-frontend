import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: 'Подтвердить заказ' | 'Продолжить' | 'Вход' | 'Изменить' | 'Выход' | 'Регистрация' | 'Оформить заказ';
	appearance: 'yellow' | 'blue';
}