import { atom, selector } from 'recoil';
// import { get as getRequest } from '../httpService';

export const authSlice = atom({
	key: 'authSlice',
	default: {},
});

export const cartItems = atom({
	key: 'cartItems',
	default: [],
});

export const cartDetailsSelector = selector({
	key: 'cartDetailsSelector',
	get: ({ get }) => {
	  const items = get(cartItems);
	  const subtotal = items.reduce(
		(acc, item) => acc + item.productDetails.price * item.qty,
		0
	  );
	  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);
	  const shipping = 30.0; // or get from some other atom if it's dynamic
  
	  return {
		subtotal,
		shipping,
		totalItems
	  };
	}
  });

// Selector to add an item to the cart
export const addItemToCart = selector({
	key: 'addItemToCart',
	get: ({ get }) => get(cartItems),
	set: ({ set, get }, product) => {
		const { _id: productId } = product || {};
		const currentCartItems = get(cartItems);
		const productIndex = currentCartItems.findIndex(
			(item) => item.productDetails._id === productId
		);
		const currentProduct =
			productIndex !== -1 ? currentCartItems[productIndex] : null;

		let updatedCartItems;

		if (currentProduct?.qty > 0) {
			updatedCartItems = [
				...currentCartItems.slice(0, productIndex),
				{ ...currentProduct, qty: currentProduct.qty + 1 },
				...currentCartItems.slice(productIndex + 1),
			];
		} else {
			updatedCartItems = [
				...currentCartItems,
				{ qty: 1, productDetails: product },
			];
		}
		set(cartItems, updatedCartItems);
	},
});

// Selector to remove an item from the cart
export const removeItemFromCart = selector({
	key: 'removeItemFromCart',
	get: ({ get }) => get(cartItems),
	set: ({ set, get }, product) => {
		const { _id: productId } = product || {};
		const currentCartItems = get(cartItems);
		const productIndex = currentCartItems.findIndex(
			(item) => item.productDetails._id === productId
		);
		const currentProduct =
			productIndex !== -1 ? currentCartItems[productIndex] : null;
		let updatedCartItems;

		if (currentProduct?.qty > 1) {
			updatedCartItems = [
				...currentCartItems.slice(0, productIndex),
				{ ...currentProduct, qty: currentProduct.qty - 1 },
				...currentCartItems.slice(productIndex + 1),
			];
		} else {
			updatedCartItems = [
				...currentCartItems.slice(0, productIndex),
				...currentCartItems.slice(productIndex + 1),
			];
		}
		set(cartItems, updatedCartItems);
	},
});