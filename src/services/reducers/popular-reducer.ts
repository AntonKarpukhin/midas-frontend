import { Product } from "../../interfaces/product.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { dataErrorMessage, dataUrl } from "../../utils/data";
import { getStockMenu } from "./stock-reducer";


export interface PopularState {
	popular: Product[];
	popularErrorMessage: string | undefined
}

const initialState: PopularState = {
	popular: [],
	popularErrorMessage: undefined
}


export const gerPopularMenu = createAsyncThunk('popular',
	async () => {
		const menu = ['Горячие блюда', 'Супы', 'Хинкали', 'Салаты', 'Десерты', 'Напитки'];
		try {
			const { data } = await axios.post(`${dataUrl}/menu`, {
				headers: {
					'Content-Type': 'application/json',
				},
				menu,
			})
			return Object.values( data ).map( item => item.slice( 0, 2 ) ).flat()
		} catch ( e ) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const popularReducer = createSlice({
	name: 'stock',
	initialState,
	reducers: {
		clearPopularMessage: (state) => {
			state.popularErrorMessage = undefined;
		}
	},
	extraReducers: ( builder ) => {
		builder.addCase(gerPopularMenu.fulfilled, (state, action) => {
			state.popular = action.payload
		});
		builder.addCase(gerPopularMenu.rejected, (state, action) => {
			state.popularErrorMessage = dataErrorMessage;
		});
	}

})

export default popularReducer.reducer;
export const popularActions = popularReducer.actions;