import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './services/store/store';
import router from "./utils/router";

const rootElement = document.getElementById('root');

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={router}/>
			</Provider>
		</React.StrictMode>
	);
} else {
	console.error('Root element with id "root" not found.');
}
