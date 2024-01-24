import { Product } from "../../interfaces/product.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "axios";
import { dataErrorMessage, dataUrl } from "../../utils/data";
import { getStockMenu } from "./stock-reducer";


export interface CardState {
	card: Product;
	cardErrorMessage: string | undefined;
}

const initialState: CardState = {
	card: {
		description: "",
		id: 0,
		img: "",
		name: "",
		oldPrice: 0,
		price: 0,
		weight: ""
	},
	cardErrorMessage: undefined
}

export const getCard = createAsyncThunk('card',
	async (id: number) => {
		try {
			const { data } = await axios.get<Product>(`${dataUrl}/dishes/${id}`);
			return data
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const cardReducer = createSlice({
	name: 'card',
	initialState,
	reducers: {
		clearCardMessage: (state) => {
			state.cardErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCard.fulfilled, (state, action) => {
			if (action.payload) state.card = action.payload
		});
		builder.addCase(getCard.rejected, (state, action) => {
			state.cardErrorMessage = dataErrorMessage;
		});
	}
})

export default cardReducer.reducer;
export const cardActions = cardReducer.actions;