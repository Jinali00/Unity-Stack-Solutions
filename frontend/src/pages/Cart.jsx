import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
	addItemToCart,
	cartDetailsSelector,
	cartItems,
	removeItemFromCart,
} from '../store';

const EmptyCart = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-12 py-5 bg-light text-center'>
					<h4 className='p-3 display-5'>Your Cart is Empty</h4>
					<Link to='/' className='btn  btn-outline-dark mx-4'>
						<i className='fa fa-arrow-left'></i> Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	);
};

const CartItemCard = ({ product = {} }) => {
	const removeItem = useSetRecoilState(removeItemFromCart);
	const addItem = useSetRecoilState(addItemToCart);
	const { productDetails, qty } = product || {};

	return productDetails ? (
		<div key={productDetails?._id}>
			<div className='row d-flex align-items-center'>
				<div className='col-lg-3 col-md-12'>
					<div className='bg-image rounded' data-mdb-ripple-color='light'>
						<img
							src={productDetails?.images[0]?.url}
							// className="w-100"
							alt={productDetails.name}
							width={100}
							height={75}
						/>
					</div>
				</div>

				<div className='col-lg-5 col-md-6'>
					<p>
						<strong>{productDetails?.name}</strong>
					</p>
				</div>

				<div className='col-lg-4 col-md-6'>
					<div className='d-flex mb-4' style={{ maxWidth: '300px' }}>
						<button
							className='btn px-3'
							onClick={() => {
								removeItem(productDetails);
							}}
						>
							-
						</button>

						<p
							className='px-5'
							style={{
								border: '1px solid #000',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{qty}
						</p>

						<button
							className='btn px-3'
							onClick={() => {
								addItem(productDetails);
							}}
						>
							+
						</button>
					</div>

					<p className='text-start text-md-center'>
						<strong>
							<span className='text-muted'>{qty}</span> x $
							{productDetails?.price}
						</strong>
					</p>
				</div>
			</div>

			<hr className='my-4' />
		</div>
	) : (
		<></>
	);
};

const ShowCart = ({ config = [] }) => {
	const { subtotal, shipping, totalItems } =
		useRecoilValue(cartDetailsSelector);

	return (
		<>
			<section className='h-100 gradient-custom'>
				<div className='container py-5'>
					<div className='row d-flex justify-content-center my-4'>
						<div className='col-md-8'>
							<div className='card mb-4'>
								<div className='card-header py-3'>
									<h5 className='mb-0'>Item List</h5>
								</div>
								<div className='card-body'>
									{config.map((item, index) => {
										return (
											<CartItemCard
												key={`cart-item-${item?.productDetails?._id}`}
												product={item}
											/>
										);
									})}
								</div>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='card mb-4'>
								<div className='card-header py-3 bg-light'>
									<h5 className='mb-0'>Order Summary</h5>
								</div>
								<div className='card-body'>
									<ul className='list-group list-group-flush'>
										<li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
											Products ({totalItems})
											<span>${Math.round(subtotal)}</span>
										</li>
										<li className='list-group-item d-flex justify-content-between align-items-center px-0'>
											Shipping
											<span>${shipping}</span>
										</li>
										<li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
											<div>
												<strong>Total amount</strong>
											</div>
											<span>
												<strong>${Math.round(subtotal + shipping)}</strong>
											</span>
										</li>
									</ul>

									<Link
										// to='/checkout'
										className='btn btn-dark btn-lg btn-block'
									>
										Go to checkout
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

const Cart = () => {
	const userToken = localStorage.getItem('userToken');
	const cartElements = useRecoilValue(cartItems);

	return userToken ? (
		<>
			<div className='container my-3 py-3'>
				<h1 className='text-center'>Cart</h1>
				<hr />
				{cartElements.length > 0 ? (
					<ShowCart config={cartElements} />
				) : (
					<EmptyCart />
				)}
			</div>
		</>
	) : (
		<div className='container'>
			<div className='row'>
				<div className='col-md-12 py-5 bg-light text-center'>
					<h4 className='p-3 display-5'>Please login</h4>
					<Link to='/login' className='btn  btn-outline-dark mx-4'>
						{' '}
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
