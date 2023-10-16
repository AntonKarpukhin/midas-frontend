import { InputHTMLAttributes, ReactNode } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	isValid?: boolean;
	name: string;
	type: string;
	appearance: 'big' | 'small' | 'medium';
}