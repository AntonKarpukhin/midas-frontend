import cn from 'classnames';
import styles from './button.module.css';
import { ButtonProps } from "./button.props";

const Button = ({ text, appearance, className, type, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(styles['button'], className, {
				[styles['buttonYellow']]: appearance === 'yellow',
				[styles['buttonBlue']]: appearance === 'blue'
			})}
			type={type}
			{...props}
		>
			{text}
		</button>
	)
}

export default Button;