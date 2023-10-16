import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Menu, Card, NotFound } from './pages';
import Layout from './components/layout/layout';
import Header from './components/header/header';
import ModalOverlay from './components/modal-overlay/modal-overlay';
import Basket from './pages/basket/basket';
import Catalog from './pages/catalog/catalog';
import ProductPage from './pages/product-page/product-page';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: '/',
				element: <Menu/>
			},
			{
				path: '/card',
				element: <Card/>
			},
			{
				path: '/catalog',
				element: <Catalog/>
			},
			{
				path: '/basket',
				element: <Basket/>
			}
			,
			{
				path: '/product/:id',
				element: <ProductPage/>
			}
		]
	},
	{
		path: '*',
		element: <NotFound/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>


	</React.StrictMode>
	
);
