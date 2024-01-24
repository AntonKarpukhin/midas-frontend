import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { dataUrl } from "../../utils/data";
import { RootState } from "../store/store-types";

export interface UserState {
	username?: string | undefined,
	password?: string | undefined | null,
	email?: string | undefined,
	phone?: string | undefined,
	street?: string | undefined,
	house?: string | undefined,
	room?: string | undefined,
}

const initialState: UserState = {
	username: undefined,
	password: undefined,
	email: undefined,
	phone: undefined,
	street: undefined,
	house: undefined,
	room: undefined,
}

export const getProfile = createAsyncThunk<UserState, void, { state: RootState }>('me',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().auth.jwt;
		const { data } = await axios.get<UserState>(`${dataUrl}/users/me`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data
	}
);

export const updateProfile = createAsyncThunk<UserState | undefined, UserState, { state: RootState }>('updateMe',
	async (profile: UserState, thunkApi) => {
		const { username, email, phone, street, room, house, password } = profile;
		const jwt = thunkApi.getState().auth.jwt;
		try {
			const { data } = await axios.patch<UserState>(`${dataUrl}/users/me`, {
				username,
				room,
				email,
				phone,
				street,
				house,
				password
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`,
					'Content-Type': 'application/json',
				},
			});
			return data
		} catch (e) {
			if (e instanceof AxiosError) {
				console.log(e.response?.data.message)
				throw new Error(e.response?.data.message);
			}
		}
	}
)

export const profileReducer = createSlice({
	name: 'profile',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.username = action.payload.username;
			state.password = action.payload.password;
			state.email = action.payload.email;
			state.phone = action.payload.phone;
			state.street = action.payload.street;
			state.house = action.payload.house;
			state.room = action.payload.room;
		});
	}
});

export default profileReducer.reducer;
export const profileAction = profileReducer.actions;