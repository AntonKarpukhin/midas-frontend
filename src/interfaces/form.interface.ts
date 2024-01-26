import { Product } from "./product.interface.ts";

export interface FormInterface {
	username?: {
		value: string
	};
	password?: {
		value: string
	};
	email?: {
		value: string
	};
	phone?: {
		value: string
	};
	street?: {
		value: string
	};
	house?: {
		value: string
	};
	room?: {
		value: string
	};
	deliveryMethod?: string;
	userId?: number;
	counter?: number;
	dishes?: Product[];
}