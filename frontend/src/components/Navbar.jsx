import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authSlice } from '../store';
// import { useSelector } from 'react-redux'

const Navbar = () => {
	const [userDetails, setUserDetails] = useRecoilState(authSlice);
	// const state = useSelector(state => state.handleCart)

	const handleLogout = () => {
		localStorage.removeItem('userToken');
		setUserDetails(null);
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top'>
			<div className='container d-flex align-items-center justify-content-between w-100'>
				<NavLink className='navbar-brand fw-bold fs-4 px-2' to='/'>
					{' '}
					React Ecommerce
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
				<input
					type='text'
					className='form-control'
					style={{ flex: 1 }}
					id='search'
					placeholder='Search...'
				/>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
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
									<i className='fa fa-sign-in-alt mr-1'></i> Login
								</NavLink>
								<NavLink
									to='/register'
									className='btn btn-outline-dark w-max m-2'
								>
									<i className='fa fa-user-plus mr-1'></i> Register
								</NavLink>
							</>
						)}
						<NavLink to='/cart' className='btn btn-outline-dark m-2'>
							<i className='fa fa-cart-shopping mr-1'></i> Cart{' '}
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
