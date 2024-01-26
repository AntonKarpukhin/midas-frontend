import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { dataUrl } from "../../utils/data.ts";
import { RootState } from "../store/store-types.ts";
import { HistoryOrder } from "../../interfaces/history-orders.interface.ts";
import { ProductHistory } from "../../interfaces/product-history.interface.ts";

export interface HistoryOrdersState {
	orders: HistoryOrder[];
	products: ProductHistory[];
}

const initialState: HistoryOrdersState = {
	orders: [],
	products: [],
};

export const getHistoryOrders = createAsyncThunk<HistoryOrder[], void, {state: RootState}>('historyOrder',
	async (_, thunkApi)=> {
		const jwt =  thunkApi.getState().auth.jwt;
		const id = thunkApi.getState().profile.id;
		try {
			const { data } = await axios.post<HistoryOrder[]>(`${dataUrl}/users/me/orders/history`, {
				id,
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				}
			});
			return data;
		} catch ( e ) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
			return thunkApi.rejectWithValue(e);
		}
	}
)

export const gerOneHistoryOrder = createAsyncThunk<ProductHistory[], number, {state: RootState}>('historyOneOrder',
	async (id: number, thunkApi) => {
		const jwt =  thunkApi.getState().auth.jwt;
		try {
			const { data } = await axios.get<ProductHistory[]>(`${dataUrl}/users/me/orders/history/${id}`, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
				}
			});
			return data
		} catch ( e ) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
			return thunkApi.rejectWithValue(e);
		}
	}
)

export const historyOrderReducer = createSlice({
	name: 'history',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getHistoryOrders.fulfilled, (state, action) => {
			state.orders = action.payload;
		});
		builder.addCase(gerOneHistoryOrder.fulfilled, (state, action) => {
			state.products = action.payload
		});
	}
})

export default historyOrderReducer.reducer;
export const historyOrderActions = historyOrderReducer.actions;