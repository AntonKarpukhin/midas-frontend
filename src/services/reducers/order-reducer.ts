import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store-types.ts";
import axios, { AxiosError } from "axios";
import { dataUrl } from "../../utils/data.ts";
import { OrderInterface } from "../../interfaces/order.interface.ts";
import { PostOrderInterface } from "../../interfaces/post-order.interface.ts";
import { deleteDish } from "./basket-reducer.ts";

export interface OrderState {
	orderNumber: number;
	orderErrorMessage: string | undefined;
}

const initialState: OrderState = {
	orderNumber: 0,
	orderErrorMessage: undefined
}

export const postOrder = createAsyncThunk<OrderInterface, PostOrderInterface, { state: RootState }>('postOrder',
	async (order: PostOrderInterface, thunkApi) => {
		const jwt = thunkApi.getState().auth.jwt;
		try {
			const { data } = await axios.post<OrderInterface>(`${dataUrl}/users/me/orders`, {
				order,
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				}
			});
			order.dishes.forEach(item => {
				thunkApi.dispatch(deleteDish(item.name))
			})
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
			return thunkApi.rejectWithValue(e);
		}
	}
);

export const orderReducer = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(postOrder.fulfilled, (state, action) => {
			state.orderNumber = action.payload.id
		});
		builder.addCase(postOrder.rejected, (state, error) => {
			state.orderErrorMessage = error.error.message;
		});
	}
})

export default orderReducer.reducer;
export const orderActions = orderReducer.actions;