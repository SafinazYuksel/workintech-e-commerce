import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';

import { clientReducer } from './reducers/clientReducer';
import { productReducer } from './reducers/productReducer';
import { shoppingCartReducer } from './reducers/shoppingCartReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer
});

const middlewares = [thunk];

// Safely enable logger only in dev environment
if (import.meta.env?.DEV) {
  if (typeof logger === 'function') {
    middlewares.push(logger);
  }
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
