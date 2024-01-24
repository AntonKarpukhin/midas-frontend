export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	oldPrice: number;
	img: string;
	weight: string;
	sumPrice?: number;
	count?: number;
}