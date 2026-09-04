import { API } from '../../api/axiosInstance';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setProduct = (product) => ({ type: SET_PRODUCT, payload: product });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });

// Thunk action creator to fetch product detail (T16)
export const fetchProductDetail = (productId) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  try {
    const res = await API.get(`/products/${productId}`);
    dispatch(setProduct(res.data));
    dispatch(setFetchState('FETCHED'));
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Fetch product detail error:', error);
    dispatch(setFetchState('FAILED'));
    return { success: false, error };
  }
};
