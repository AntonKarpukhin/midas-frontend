import { Product } from "../../interfaces/product.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { dataErrorMessage, dataUrl } from "../../utils/data";

export interface StockState {
	stock: Product[];
	stockErrorMessage: string | undefined;
}

const initialState: StockState = {
	stock: [],
	stockErrorMessage: undefined
}

export const getStockMenu = createAsyncThunk('stock',
	async () => {
		try {
			const { data } = await axios.get<Product[]>(`${dataUrl}/menu/Акции`);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const stockReducer = createSlice({
	name: 'stock',
	initialState,
	reducers: {
		clearStockMessage: (state) => {
			state.stockErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getStockMenu.fulfilled, (state, action) => {
			if (action.payload) state.stock = action.payload
		});
		builder.addCase(getStockMenu.rejected, (state, action) => {
			console.log(action.error.message);
			state.stockErrorMessage = dataErrorMessage;
		});
	}
})

export default stockReducer.reducer;
export const stockActions = stockReducer.actions;