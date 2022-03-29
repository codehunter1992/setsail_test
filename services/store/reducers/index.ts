import { combineReducers } from 'redux';

import product from './product';
import cart from './cart';

const rootReducer = combineReducers({
  product,
  cart,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;