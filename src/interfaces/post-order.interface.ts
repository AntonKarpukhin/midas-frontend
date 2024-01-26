import { Product } from "./product.interface.ts";

export interface PostOrderInterface {
	username: string;
	phone: string;
	email:  string;
	house: string;
	room: string;
	street: string;
	userId: number;
	counter: number;
	deliveryMethod: string;
	dishes: Product[];
}