import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { useSetRecoilState } from 'recoil';
import { authSlice } from '../store';

const Home = () => {
	const userToken = localStorage.getItem('userToken');
	const setAuth = useSetRecoilState(authSlice);

	useEffect(() => {
		if (userToken) {
			setAuth({ userToken });
		}
	}, [userToken]);

	return (
		<div className='d-flex flex-column h-100'>
			<Navbar />
			<div style={{ flex: 1 }}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
