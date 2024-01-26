import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from "../reducers/auth-reducer";
import { saveStateLocalStorage } from "../../utils/localstorage";
import { JWT_STATE } from "../../utils/data";
import profileReducer  from "../reducers/user-reducer";
import catalogReducer from "../reducers/catalog-reducer";
import cardReducer from "../reducers/card-reducer";
import stockReducer from "../reducers/stock-reducer";
import popularReducer from "../reducers/popular-reducer";
import basketReducer from "../reducers/basket-reducer";
import orderReducer from "../reducers/order-reducer.ts";
import historyOrderReducer from "../reducers/history-orders-reducer.ts";

export const store = configureStore({
	reducer: {
		auth: userReducer,
		profile: profileReducer,
		catalog: catalogReducer,
		card: cardReducer,
		stock: stockReducer,
		popular: popularReducer,
		basket: basketReducer,
		order: orderReducer,
		history: historyOrderReducer
	}
});

store.subscribe(() => {
	saveStateLocalStorage({jwt: store.getState().auth.jwt}, JWT_STATE)
});