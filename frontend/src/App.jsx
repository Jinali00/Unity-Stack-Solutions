import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { Home, Landing, Login, Register } from './pages';

const App = () => {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Routes>
					<Route path='/' element={<Home />}>
						<Route index element={<Landing />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Route>
				</Routes>
			</RecoilRoot>
		</BrowserRouter>
	);
};

export default App;
