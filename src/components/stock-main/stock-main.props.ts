import { Product } from "../../interfaces/product.interface";


export interface StockMainProps  {
	menu: Product[];
	addBasketProduct: (name: string, count: number) => void;
}