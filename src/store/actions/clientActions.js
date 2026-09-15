import { toast } from 'react-toastify';
import { API } from '../../api/axiosInstance';

export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST';
export const SET_CREDIT_CARDS = 'SET_CREDIT_CARDS';
export const LOGOUT = 'LOGOUT';

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setAddressList = (addressList) => ({ type: SET_ADDRESS_LIST, payload: addressList });
export const setCreditCards = (creditCards) => ({ type: SET_CREDIT_CARDS, payload: creditCards });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const logout = () => {
  localStorage.removeItem('token');
  delete API.defaults.headers.common['Authorization'];
  return { type: LOGOUT };
};

// Thunk action creator for login
export const loginUser = (credentials, rememberMe, navigate) => async (dispatch) => {
  try {
    const res = await API.post('/login', credentials);
    const userData = res.data;

    // Save user info on client reducer
    dispatch(setUser(userData));

    // Save token to localStorage if remember me is checked
    if (userData.token) {
      if (rememberMe) {
        localStorage.setItem('token', userData.token);
      }
      API.defaults.headers.common['Authorization'] = userData.token;
    }

    toast.success('Giriş başarılı!');

    // Redirect user to previous page, if none navigate to home
    if (navigate) {
      navigate(-1);
    }
    return { success: true, data: userData };
  } catch (error) {
    console.error('Login thunk error:', error);
    const errorMsg = error.response?.data?.message || 'Giriş yapılamadı. Lütfen e-posta ve şifrenizi kontrol ediniz.';
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

// Thunk action creator for auto login by token from localStorage (T11)
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  API.defaults.headers.common['Authorization'] = token;

  try {
    const res = await API.get('/verify');
    const userData = res.data;

    // Update user info in store
    dispatch(setUser(userData));

    // Renew token if server returns a fresh one
    if (userData.token) {
      localStorage.setItem('token', userData.token);
      API.defaults.headers.common['Authorization'] = userData.token;
    }
  } catch (error) {
    console.error('Verify token error:', error);
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
  }
};

// Thunk action creator to get roles and put in store
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles && roles.length > 0) return;

  try {
    const res = await API.get('/roles');
    dispatch(setRoles(res.data));
  } catch (error) {
    console.error('Roles fetch error in thunk:', error);
  }
};

// Address Thunks (T20)
export const fetchAddressList = () => async (dispatch) => {
  try {
    const res = await API.get('/user/address');
    dispatch(setAddressList(res.data));
    return res.data;
  } catch (error) {
    console.error('Fetch address list error:', error);
    toast.error('Adres bilgileri alınamadı.');
    return [];
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  try {
    const res = await API.post('/user/address', addressData);
    toast.success('Yeni adres başarıyla eklendi.');
    dispatch(fetchAddressList());
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Add address error:', error);
    const msg = error.response?.data?.message || 'Adres eklenirken bir hata oluştu.';
    toast.error(msg);
    return { success: false, error: msg };
  }
};

export const updateAddress = (addressData) => async (dispatch) => {
  try {
    const res = await API.put('/user/address', addressData);
    toast.success('Adres başarıyla güncellendi.');
    dispatch(fetchAddressList());
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Update address error:', error);
    const msg = error.response?.data?.message || 'Adres güncellenirken bir hata oluştu.';
    toast.error(msg);
    return { success: false, error: msg };
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    await API.delete(`/user/address/${addressId}`);
    toast.info('Adres silindi.');
    dispatch(fetchAddressList());
    return { success: true };
  } catch (error) {
    console.error('Delete address error:', error);
    const msg = error.response?.data?.message || 'Adres silinirken bir hata oluştu.';
    toast.error(msg);
    return { success: false, error: msg };
  }
};

// Credit Card Thunks (T21)
export const fetchCreditCards = () => async (dispatch) => {
  try {
    const res = await API.get('/user/card');
    dispatch(setCreditCards(res.data));
    return res.data;
  } catch (error) {
    console.error('Fetch credit cards error:', error);
    toast.error('Kayıtlı kart bilgileri alınamadı.');
    return [];
  }
};

export const addCreditCard = (cardData) => async (dispatch) => {
  try {
    const res = await API.post('/user/card', cardData);
    toast.success('Yeni kart başarıyla kaydedildi.');
    dispatch(fetchCreditCards());
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Add credit card error:', error);
    const msg = error.response?.data?.message || 'Kart kaydedilirken bir hata oluştu.';
    toast.error(msg);
    return { success: false, error: msg };
  }
};

export const updateCreditCard = (cardData) => async (dispatch) => {
  try {
    const res = await API.put('/user/card', cardData);
    toast.success('Kart bilgileri güncellendi.');
    dispatch(fetchCreditCards());
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Update credit card error:', error);
    const msg = error.response?.data?.message || 'Kart güncellenirken bir hata oluştu.';
    toast.error(msg);
    return { success: false, error: msg };
  }
};

export const deleteCreditCard = (cardId) => async (dispatch) => {
  try {
    await API.delete(`/user/card/${cardId}`);
    toast.info('Kart silindi.');
    dispatch(fetchCreditCards());
    return { success: true };
  } catch (error) {
    console.error('Delete credit card error:', error);
    const msg = error.response?.data?.message || 'Kart silinirken bir hata oluştu.';
    toast.error(msg);
    return { success: false, error: msg };
  }
};


