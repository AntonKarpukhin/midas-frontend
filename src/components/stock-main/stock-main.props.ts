import { Product } from "../../interfaces/product.interface";
import { HTMLAttributes } from "react";

export interface StockMainProps extends HTMLAttributes<HTMLDivElement> {
	menu: Product[];
	addBasketProduct: (name: string, count: number) => void;
}