import * as actionTypes from '../actionTypes';
import { updateState } from '../util';

const initialState = {
  productList: [],
  loading: false,
};

const updateProduct = (state: any, action: any) => { 
  return updateState(
    state,
    {
      productList: action.productList,
    }
  )
};

const updateLoading = (state: any, action: any) => { 
  return updateState(
    state,
    {
      loading: action.loading,
    }
  )
};

const reducer = (state = initialState, action: any) => { 
  switch (action.type) {
    case actionTypes.UPDATE_CART_PRODUCT: return updateProduct(state, action);
    case actionTypes.UPDATE_LOADING: return updateLoading(state, action);
    default: return state;
  }
};

export default reducer;