export const SET_CART = 'SET_CART';
export const UPDATE_CART_ITEM_COUNT = 'UPDATE_CART_ITEM_COUNT';
export const TOGGLE_CART_ITEM_CHECK = 'TOGGLE_CART_ITEM_CHECK';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const updateCartItemCount = (productId, count) => ({
  type: UPDATE_CART_ITEM_COUNT,
  payload: { productId, count }
});
export const toggleCartItemCheck = (productId) => ({
  type: TOGGLE_CART_ITEM_CHECK,
  payload: productId
});
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});
export const toggleSelectAll = (checked) => ({
  type: TOGGLE_SELECT_ALL,
  payload: checked
});
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address });

