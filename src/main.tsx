import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Menu, Card, NotFound } from './components/pages';
import Layout from './components/layout/layout';
import Header from './components/header/header';

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
