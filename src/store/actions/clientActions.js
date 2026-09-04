import { toast } from 'react-toastify';
import { API } from '../../api/axiosInstance';

export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOGOUT = 'LOGOUT';

export const setUser = (user) => ({ type: SET_USER, payload: user });
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
