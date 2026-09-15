import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_ADDRESS_LIST, SET_CREDIT_CARDS, LOGOUT } from '../actions/clientActions';

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: '',
  language: ''
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload };
    case SET_CREDIT_CARDS:
      return { ...state, creditCards: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case LOGOUT:
      return { ...state, user: {}, addressList: [], creditCards: [] };
    default:
      return state;
  }
};
