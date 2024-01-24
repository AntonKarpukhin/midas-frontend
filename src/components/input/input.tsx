import { forwardRef, useEffect, useRef, useState } from "react";
import { InputProps } from "./input.props";
import cn from 'classnames';
import styles from './input.module.css';
import useResize from "../../hooks/use-resize";


const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid, type, name, appearance, className, labelName, initialValue = '' }, ref) {

	const [value, setValue] = useState<string>(initialValue ?? '');
	const refLabel = useRef<HTMLLabelElement | null>(null);
	const width = useResize();

	return (
		<label ref={refLabel!} className={cn(styles['label'])} htmlFor={name}>
			<p className={cn(styles['paragraph'])}>{labelName}</p>
			<input
				id={name}
				className={cn(styles['input'], className!, {
					[styles['inputBig']]: appearance === 'big',
					[styles['inputSmall']]: appearance === 'small'
				})}
				placeholder={width.width <= 767 ? labelName : undefined!}
				ref={ref!}
				type={type}
				name={name}
				value={value}
				onChange={event => setValue(event.target.value)}
			/>
		</label>
	)
})

export default Input;