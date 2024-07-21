import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { Home, Landing, Login, Register } from './pages';
import Cart from './pages/Cart';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CartItems from './pages/CartItems';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

const App = () => {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Routes>
					<Route path='/' element={<Home />}>
						<Route index element={<Landing />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/cart' element={<Cart />}>
							<Route index element={<CartItems />} />
							<Route path='checkout' element={<Checkout />} />
						</Route>
						<Route path='/orders' element={<Orders />} />

						<Route path='/products' element={<Products />} />
						<Route path='/product/:productId' element={<ProductDetails />} />
					</Route>
				</Routes>
			</RecoilRoot>
		</BrowserRouter>
	);
};

export default App;
