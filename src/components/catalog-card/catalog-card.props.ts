import { MouseEvent } from "react";

export interface CatalogCardProps {
	id: number;
	name: string;
	description: string;
	price: number;
	oldPrice: number;
	img: string;
	weight: string;
	addBasketProduct: (name: string, count: number, e: MouseEvent) => void;
	onClickProduct: (e: MouseEvent, id: number) => void;
}