import { IButtonProps } from './button.types';
import cn from 'classnames';
import styles from './button.module.css';

const Button = ({children, className, appearance, ...props}: IButtonProps) => {
	return (
		<>
			<button className={cn(styles.button, className, {
				[styles.small]: appearance === 'small',
				[styles.big]: appearance === 'big'
			})} {...props}>{children}</button>
		</>
	);	
};

export default Button;