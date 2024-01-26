import { Product } from "../../interfaces/product.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { dataErrorMessage, dataUrl } from "../../utils/data";
import { RootState } from "../store/store-types";

export interface BasketState {
	basket: Product[],
	counter: number | undefined;
	basketErrorMessage: string | undefined;
}

const initialState: BasketState = {
	basket: [],
	counter: 0,
	basketErrorMessage: undefined
}

export const getAllDish = createAsyncThunk<Product[], void, { state: RootState }>('getAllDish',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().auth.jwt;
		try {
			const { data}  = await axios.get<Product[]>(`${dataUrl}/me/basket`, {
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
			return thunkApi.rejectWithValue(e);
		}
	}
)

export const addDish = createAsyncThunk<Product[], { name: string, count: number }, { state: RootState }>('addDish',
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
			return thunkApi.rejectWithValue(e);
		}
	}
)

export const deleteDish = createAsyncThunk<Product[], string, { state: RootState }>('deleteDish',
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
			return thunkApi.rejectWithValue(e);
		}
	}
)

export const basketReducer = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		clearBasketMessage: (state) => {
			state.basketErrorMessage = undefined;
		},
		clearBasketProduct: (state) => {
			state.basket = [];
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
			state.counter = action.payload.reduce((a, b) => (a + (b.sumPrice ?? 0)), 0);
		});
		builder.addCase(getAllDish.rejected, (state) => {
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
			state.counter = action.payload.reduce((a, b) => (a + (b.sumPrice ?? 0)), 0);
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
			state.counter = action.payload.reduce((a, b) => (a + (b.sumPrice ?? 0)), 0);
		});
	}
});

export default basketReducer.reducer;
export const basketActions = basketReducer.actions;