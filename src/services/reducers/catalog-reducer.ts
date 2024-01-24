import { Product } from "../../interfaces/product.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { dataErrorMessage, dataUrl } from "../../utils/data";
import { getStockMenu } from "./stock-reducer";


export interface CatalogState {
	catalog: Product[];
	catalogErrorMessage: string | undefined;
}

const initialState: CatalogState = {
	catalog: [],
	catalogErrorMessage: undefined
}

export const getCatalog = createAsyncThunk('catalog',
	async (text: string) => {
		try {
			const { data } = await axios.get<Product[]>(`${dataUrl}/menu/${text}`)
			return data;
		} catch ( e ) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const catalogReducer = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		clearCatalogMessage: (state) => {
			state.catalogErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCatalog.fulfilled, (state, action) => {
			state.catalog = action.payload
		});
		builder.addCase(getCatalog.rejected, (state, action) => {
			console.log(action)
			state.catalogErrorMessage = dataErrorMessage;
		});
	}
})

export default catalogReducer.reducer;
export const catalogActions = catalogReducer.actions;