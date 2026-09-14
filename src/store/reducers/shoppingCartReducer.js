import {
  SET_CART,
  UPDATE_CART_ITEM_COUNT,
  TOGGLE_CART_ITEM_CHECK,
  REMOVE_FROM_CART,
  TOGGLE_SELECT_ALL,
  SET_PAYMENT,
  SET_ADDRESS
} from '../actions/shoppingCartActions';

const initialState = {
  cart: [],
  payment: {},
  address: {}
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };

    case UPDATE_CART_ITEM_COUNT: {
      const { productId, count } = action.payload;
      if (count <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.product.id !== productId)
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, count } : item
        )
      };
    }

    case TOGGLE_CART_ITEM_CHECK: {
      const productId = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.product.id === productId) {
            const isChecked = item.checked !== false;
            return { ...item, checked: !isChecked };
          }
          return item;
        })
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload)
      };
    }

    case TOGGLE_SELECT_ALL: {
      return {
        ...state,
        cart: state.cart.map((item) => ({ ...item, checked: action.payload }))
      };
    }

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    default:
      return state;
  }
};

