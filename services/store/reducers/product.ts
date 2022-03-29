import * as actionTypes from '../actionTypes';
import { updateState } from '../util';

const initialState = {
  productList: null,
};

const updateProduct = (state: any, action: any) => { 
  return updateState(
    state,
    {
      productList: action.productList,
    }
  )
};

const reducer = (state = initialState, action: any) => { 
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCT: return updateProduct(state, action);
    default: return state;
  }
};

export default reducer;