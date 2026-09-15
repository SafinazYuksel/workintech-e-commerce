import { API } from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export const SET_CART = 'SET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM_COUNT = 'UPDATE_CART_ITEM_COUNT';
export const TOGGLE_CART_ITEM_CHECK = 'TOGGLE_CART_ITEM_CHECK';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
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

// Create Order Thunk (T22)
export const createOrder = (orderPayload) => async (dispatch) => {
  try {
    const res = await API.post('/order', orderPayload);
    toast.success('🎉 Siparişiniz başarıyla alındı!');
    // Reset cart and checkout states
    dispatch(setCart([]));
    dispatch(setAddress({}));
    dispatch(setPayment({}));
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Create order API error:', error);
    const msg = error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu.';
    toast.error(msg);
    return { success: false, error: msg };
  }
};

