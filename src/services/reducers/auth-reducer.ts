import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadStateLocalStorage } from "../../utils/localstorage";
import { dataUrl, JWT_STATE } from "../../utils/data";
import { LoginResponse } from "../../interfaces/auth.interface";
import axios, { AxiosError } from "axios";

export interface AuthState {
	jwt: string | null;
	errorMessage: string | undefined;
}

export interface UserPersistentStateJWT {
	jwt: string | null;
}

const initialState: AuthState = {
	jwt: loadStateLocalStorage<UserPersistentStateJWT>(JWT_STATE)?.jwt ?? null,
	errorMessage: undefined
}

export const login = createAsyncThunk('signin',
	async (params: { username: string, password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${dataUrl}/signin`, {
				username: params.username,
				password: params.password
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const userRegistration = createAsyncThunk('signup',
	async (params: { username: string, password: string, email: string }) => {

		try {
			const { data } = await axios.post<LoginResponse>(`${dataUrl}/signup`, {
				username: params.username,
				password: params.password,
				email: params.email
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const authReducer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearError: (state) => {
			state.errorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token
		});
		builder.addCase(login.rejected, (state, error) => {
			state.errorMessage = error.error.message
		})

		builder.addCase(userRegistration.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token
		});
		builder.addCase(userRegistration.rejected, (state, error) => {
			state.errorMessage = error.error.message
		})
	}
});

export default authReducer.reducer;
export const authActions = authReducer.actions;