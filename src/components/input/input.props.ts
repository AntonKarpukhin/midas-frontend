import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean;
	appearance: 'big' | 'small';
	labelName: string;
	initialValue?: string;
}