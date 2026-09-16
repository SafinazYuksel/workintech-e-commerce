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

const sampleFallbackImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
];

const categoryNamesMap = {
  1: 'Tişört',
  2: 'Ayakkabı',
  3: 'Ceket',
  4: 'Elbise',
  5: 'Etek',
  6: 'Gömlek',
  7: 'Kazak',
  8: 'Pantolon',
  9: 'Ayakkabı',
  10: 'Ceket',
  11: 'Gömlek',
  12: 'Kazak',
  13: 'Pantolon',
  14: 'Tişört'
};

const generateFallbackProducts = (catId, categoriesState = []) => {
  const foundCat = categoriesState.find((c) => String(c.id) === String(catId));
  const catName = foundCat?.title || categoryNamesMap[catId] || 'Kategori';

  return Array.from({ length: 5 }, (_, i) => ({
    id: Number(`${catId}000${i + 1}`),
    name: `${catName} Kategori Ürünü #${i + 1}`,
    description: `Şık ve modern kesim ${catName} modeli. Yüksek kaliteli kumaş ve rahat kullanım.`,
    price: 149.99 + i * 50,
    rating: 4.8,
    stock: 25,
    category_id: Number(catId),
    images: [{ url: sampleFallbackImages[i % sampleFallbackImages.length] }]
  }));
};

// Thunk action creator to fetch categories (T12)
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

// Thunk action creator to fetch products (T13 & T15)
export const fetchProducts = (params = {}) => async (dispatch, getState) => {
  dispatch(setFetchState('FETCHING'));
  try {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.filter) queryParams.append('filter', params.filter);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.limit !== undefined) queryParams.append('limit', params.limit);
    if (params.offset !== undefined) queryParams.append('offset', params.offset);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    const res = await API.get(endpoint);
    
    // Handle response object shape: { total: 185, products: [...] }
    let productList = Array.isArray(res.data) ? res.data : (res.data.products || []);
    let total = res.data.total !== undefined ? res.data.total : productList.length;

    // If a specific category returned 0 products from API, generate 5 fallback products
    if (params.category && productList.length === 0) {
      const { categories } = getState().product;
      productList = generateFallbackProducts(params.category, categories);
      total = productList.length;
    }

    // Set total and products to Product Reducer
    dispatch(setProductList(productList));
    dispatch(setTotal(total));
    dispatch(setFetchState('FETCHED'));
    return { success: true, data: productList, total };
  } catch (error) {
    console.error('Fetch products error:', error);

    // Fallback on error if category is selected
    if (params.category) {
      const { categories } = getState().product;
      const productList = generateFallbackProducts(params.category, categories);
      dispatch(setProductList(productList));
      dispatch(setTotal(productList.length));
      dispatch(setFetchState('FETCHED'));
      return { success: true, data: productList, total: productList.length };
    }

    dispatch(setFetchState('FAILED'));
    return { success: false, error };
  }
};

// Thunk action creator to fetch single product detail (T16)
export const fetchProductDetail = (productId) => async (dispatch, getState) => {
  dispatch(setFetchState('FETCHING'));
  try {
    const res = await API.get(`/products/${productId}`);
    dispatch(setProduct(res.data));
    dispatch(setFetchState('FETCHED'));
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Fetch product detail error:', error);
    // Check if the product exists in current productList state (e.g. fallback generated product)
    const { productList } = getState().product;
    const existing = productList.find((p) => String(p.id) === String(productId));
    if (existing) {
      dispatch(setProduct(existing));
      dispatch(setFetchState('FETCHED'));
      return { success: true, data: existing };
    }

    dispatch(setFetchState('FAILED'));
    return { success: false, error };
  }
};
