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

// Thunk action creator to fetch categories
export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().product;
  if (categories && categories.length > 0) return;

  try {
    const res = await API.get('/categories');
    dispatch(setCategories(res.data));
  } catch (error) {
    console.error('Fetch categories error:', error);
  }
};

// Thunk action creator to fetch products with category, filter, sort parameters
export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  try {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.filter) queryParams.append('filter', params.filter);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.offset) queryParams.append('offset', params.offset);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    const res = await API.get(endpoint);
    const productList = Array.isArray(res.data) ? res.data : (res.data.products || []);
    const total = res.data.total !== undefined ? res.data.total : productList.length;

    dispatch(setProductList(productList));
    dispatch(setTotal(total));
    dispatch(setFetchState('FETCHED'));
    return { success: true, data: productList };
  } catch (error) {
    console.error('Fetch products error:', error);
    dispatch(setFetchState('FAILED'));
    return { success: false, error };
  }
};

// Thunk action creator to fetch single product detail (T16)
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
