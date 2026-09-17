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
export const createOrder = (orderPayload) => async (dispatch, getState) => {
  const state = getState();
  const user = state.client.user;
  const cart = state.shoppingCart.cart;

  const checkedItems = cart.filter((item) => item.checked !== false);
  const productsList = checkedItems.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    count: item.count,
    images: item.product.images
  }));

  const newOrder = {
    id: Math.floor(1000 + Math.random() * 9000),
    order_date: orderPayload.order_date || new Date().toISOString(),
    customer_name: user?.name || (user?.email ? user.email.split('@')[0] : 'Müşteri'),
    customer_email: user?.email || 'musteri@gmail.com',
    price: orderPayload.price || 0,
    status: 'Tamamlandı',
    card_name: orderPayload.card_name || 'Kayıtlı Müşteri',
    card_no: `**** **** **** ${String(orderPayload.card_no || '1234').slice(-4)}`,
    address_id: orderPayload.address_id || 1,
    products: productsList
  };

  // Save new order to localStorage so it persists across sessions
  try {
    const existingStr = localStorage.getItem('system_placed_orders');
    const existingOrders = existingStr ? JSON.parse(existingStr) : [];
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('system_placed_orders', JSON.stringify(updatedOrders));
  } catch (err) {
    console.warn('LocalStorage order save warning:', err);
  }

  // Also send order to backend if available
  try {
    await API.post('/order', orderPayload);
  } catch (err) {
    console.warn('Backend order API log:', err);
  }

  toast.success('🎉 Siparişiniz başarıyla alındı!');
  // Reset cart and checkout states
  dispatch(setCart([]));
  dispatch(setAddress({}));
  dispatch(setPayment({}));
  return { success: true, data: newOrder };
};

// Fetch Orders Thunk (T23)
export const fetchOrders = () => async (dispatch, getState) => {
  const user = getState?.()?.client?.user;
  const isAdmin = user && (user.role_id === 1 || user.role === 'admin');

  let localOrders = [];
  try {
    const existingStr = localStorage.getItem('system_placed_orders');
    localOrders = existingStr ? JSON.parse(existingStr) : [];
  } catch (err) {
    console.warn('LocalStorage order read warning:', err);
  }

  let backendOrders = [];
  try {
    const res = await API.get('/order');
    if (Array.isArray(res.data)) {
      backendOrders = res.data;
    }
  } catch (error) {
    console.warn('Fetch API orders silently handled:', error);
  }

  // Merge local orders and API orders
  const allOrdersMap = new Map();
  [...localOrders, ...backendOrders].forEach((ord) => {
    if (ord && ord.id) {
      allOrdersMap.set(String(ord.id), ord);
    }
  });

  const combinedOrders = Array.from(allOrdersMap.values());

  if (isAdmin) {
    // Admin sees ALL orders placed in the system!
    return combinedOrders;
  } else {
    // Customer sees their own orders
    if (!user || !user.email) return combinedOrders;
    return combinedOrders.filter(
      (ord) => !ord.customer_email || ord.customer_email === user.email
    );
  }
};

