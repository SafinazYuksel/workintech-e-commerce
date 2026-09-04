import { API } from '../../api/axiosInstance';

export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });

// Thunk action creator to get roles and put in store (triggered only in case of need)
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
