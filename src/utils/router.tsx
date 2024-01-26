import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page/home-page";
import Loading from "../components/loading/loading";

const MainPage = lazy(() => import("../pages/main-page/main-page"));
const CatalogPage = lazy(() => import("../pages/catalog-page/catalog-page"));
const CardPage = lazy(() => import("../pages/card-page/card-page"));
const RegistrationPage = lazy(() => import("../pages/registration-page/registration-page"));
const LoginPage = lazy(() => import("../pages/login-page/login-page"));
const ProfilePage = lazy(() => import("../pages/profile-page/profile-page"));
const Basket = lazy(() => import("../pages/basket-page/basket-page"));
const NotFoundPage = lazy(() => import("../pages/not-found-page/not-found-page"));
const PlacingOrderPage = lazy(() => import("../pages/placing-order-page/placing-order-page"));
const ThanksPage = lazy(() => import("../pages/thanks-page/thanks-page"));
const HistoryOrdersPage = lazy(() => import("../pages/history-orders-page/history-orders-page.tsx"));
const OrderHistoryPage = lazy(() => import("../pages/order-history-page/order-history-page.tsx"));

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage/>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<Loading/>}><MainPage/></Suspense>,
			},
			{
				path: '/catalog/:id',
				element: <Suspense fallback={<Loading/>}><CatalogPage/></Suspense>,
			},
			{
				path: '/card/:id',
				element: <Suspense fallback={<Loading/>}><CardPage/> </Suspense>,
			},
			{
				path: '/registration',
				element: <Suspense fallback={<Loading/>}> <RegistrationPage/> </Suspense>
			},
			{
				path: '/login',
				element: <Suspense fallback={<Loading/>}> <LoginPage/></Suspense>
			},
			{
				path: '/profile',
				element: <Suspense fallback={<Loading/>}> <ProfilePage/> </Suspense>
			},
			{
				path: '/basket',
				element: <Suspense fallback={<Loading/>}><Basket/></Suspense>
			},
			{
				path: '/placing',
				element: <Suspense fallback={<Loading/>}><PlacingOrderPage/></Suspense>
			},
			{
				path: '/orders',
				element: <Suspense fallback={<Loading/>}><HistoryOrdersPage/></Suspense>
			},
			{
				path: '/orders/:id',
				element: <Suspense fallback={<Loading/>}><OrderHistoryPage/> </Suspense>,
			},
			{
				path: '/thanks',
				element: <Suspense fallback={<Loading/>}><ThanksPage/></Suspense>
			},
		]
	},
	{
		path: '/*',
		element: <Suspense fallback={<Loading/>}><NotFoundPage/></Suspense>
	},
])

export default router;