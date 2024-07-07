import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authSlice } from '../store';
import Search from './Search';
// import { useSelector } from 'react-redux'
import './index.scss'

const Navbar = () => {
	const [userDetails, setUserDetails] = useRecoilState(authSlice);
	// const state = useSelector(state => state.handleCart)

	const handleLogout = () => {
		localStorage.removeItem('userToken');
		setUserDetails(null);
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top justify-content-center'>
			<div className='container d-flex align-items-center justify-content-between w-100'>
				<NavLink className='navbar-brand fw-bold fs-4 px-2' to='/'>
					{' '}
					Urban Cart
				</NavLink>
				<button
					className='navbar-toggler mx-2'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				{window.innerWidth > 568 && <Search />}
				<div
					className='collapse navbar-collapse flex-grow-0'
					id='navbarSupportedContent'
				>
					<div className='d-flex align-items-center buttons text-center flex-nowrap'>
						{userDetails && userDetails?.userToken ? (
							<button
								onClick={handleLogout}
								className='btn btn-outline-dark w-max m-2'
							>
								Logout
							</button>
						) : (
							<>
								<NavLink to='/login' className='btn btn-outline-dark w-max m-2'>
									Login
								</NavLink>
								<NavLink
									to='/register'
									className='btn btn-outline-dark w-max m-2'
								>
									Register
								</NavLink>
							</>
						)}
						<NavLink to='/cart' className='btn btn-outline-dark m-2'>
							Cart{' '}
						</NavLink>
					</div>
				</div>
			</div>
			{window.innerWidth < 568 && <Search />}
		</nav>
	);
};

export default Navbar;
