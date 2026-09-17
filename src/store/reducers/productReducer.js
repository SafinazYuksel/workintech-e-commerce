import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_PRODUCT,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../actions/productActions';

const initialState = {
  categories: [],
  productList: [],
  product: null,
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED' // "NOT_FETCHED", "FETCHING", "FETCHED", "FAILED"
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_PRODUCT:
      return { ...state, product: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case ADD_PRODUCT: {
      const newProduct = {
        id: action.payload.id || Date.now(),
        ...action.payload,
        rating: action.payload.rating || 4.8,
        images: action.payload.images?.length
          ? action.payload.images
          : [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' }]
      };
      return {
        ...state,
        productList: [newProduct, ...state.productList],
        total: state.total + 1
      };
    }
    case UPDATE_PRODUCT: {
      const updatedList = state.productList.map((p) =>
        String(p.id) === String(action.payload.id) ? { ...p, ...action.payload } : p
      );
      const updatedProduct =
        state.product && String(state.product.id) === String(action.payload.id)
          ? { ...state.product, ...action.payload }
          : state.product;
      return {
        ...state,
        productList: updatedList,
        product: updatedProduct
      };
    }
    case DELETE_PRODUCT: {
      const filteredList = state.productList.filter((p) => String(p.id) !== String(action.payload));
      const isCurrentDeleted = state.product && String(state.product.id) === String(action.payload);
      return {
        ...state,
        productList: filteredList,
        total: Math.max(0, state.total - 1),
        product: isCurrentDeleted ? null : state.product
      };
    }
    default:
      return state;
  }
};
