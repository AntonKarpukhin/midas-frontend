import { Product } from "../../interfaces/product.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { dataErrorMessage, dataUrl } from "../../utils/data";
import { RootState } from "../store/store-types";
import { getStockMenu } from "./stock-reducer";

export interface BasketState {
	basket: Product[],
	counter: number;
	basketErrorMessage: string | undefined;
}

const initialState: BasketState = {
	basket: [],
	counter: 0,
	basketErrorMessage: undefined
}

export const getAllDish = createAsyncThunk<BasketState, void, { state: RootState }>('getAllDish',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().auth.jwt;
		try {
			const { data } = await axios.get<Product[]>(`${dataUrl}/me/basket`, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				}
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const addDish = createAsyncThunk<BasketState, void, { state: RootState }>('addDish',
	async (idCount: { name: string, count: number }, thunkApi) => {
		const jwt = thunkApi.getState().auth.jwt;
		try {
			const { data } = await axios.post<Product[]>(`${dataUrl}/me/basket`, {
				idCount,
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				},
			});
			return data
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const deleteDish = createAsyncThunk<BasketState, void, { state: RootState }>('deleteDish',
	async (name: string, thunkApi) => {
		const jwt = thunkApi.getState().auth.jwt;
		try {
			const { data } = await axios.post<Product[]>(`${dataUrl}/me/basket/delete`, {
				name,
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				}
			})
			return data
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const basketReducer = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		clearBasketMessage: (state) => {
			state.stockErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAllDish.fulfilled, (state, action) => {
			state.basket = action.payload;
			if (action.payload.length === 1) {
				state.counter = action.payload[0].sumPrice;
				return;
			} else if (action.payload.length === 0) {
				state.counter = 0;
				return;
			}
			state.counter = action.payload.reduce((a, b) => (a + b.sumPrice), 0);
		});
		builder.addCase(getAllDish.rejected, (state, action) => {
			state.basketErrorMessage = dataErrorMessage;
		});

		builder.addCase(addDish.fulfilled, (state, action) => {
			state.basket = action.payload;
			if (action.payload.length === 1) {
				state.counter = action.payload[0].sumPrice;
				return;
			} else if (action.payload.length === 0) {
				state.counter = 0;
				return;
			}
			state.counter = action.payload.reduce((a, b) => (a + b.sumPrice), 0);
		});

		builder.addCase(deleteDish.fulfilled, (state, action) => {
			state.basket = action.payload;
			if (action.payload.length === 1) {
				state.counter = action.payload[0].sumPrice;
				return;
			} else if (action.payload.length === 0) {
				state.counter = 0;
				return;
			}
			state.counter = action.payload.reduce((a, b) => (a + b.sumPrice), 0);
		});
	}
});

export default basketReducer.reducer;
export const basketActions = basketReducer.actions;