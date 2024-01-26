import { ButtonHTMLAttributes } from "react";

export interface ButtonBasketProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	addBasketProduct: (name: string, count: number) => void;
	name?: string;
	count?: number;
	jwt?: string | null;
}