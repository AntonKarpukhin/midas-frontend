import { IInputProps } from './input.types';
import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './input.module.css';

const Input = forwardRef<HTMLInputElement, IInputProps>(({isValid = true, className, appearance, name, type, children}, ref) => {
	return (
		<>
			<label className={styles.label} htmlFor={name}>
				{children}
				<input ref={ref} type={type} id={name} className={cn(styles.input, {
					[styles.small]: appearance === 'small',
					[styles.big]: appearance === 'big',
					[styles.medium]: appearance === 'medium',
					[styles.isValid]: !isValid
				}, className)} />
			</label>
		</>
	);
});

export default Input;