import { Product } from "../../interfaces/product.interface";

export interface BasketCardProps {
	card: Product;
	deleteProduct: (name: string) => void;
	changeProduct: (name: string, count: number) => void;
}