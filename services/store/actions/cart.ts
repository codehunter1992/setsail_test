import * as actionTypes from '../actionTypes';

const updateCart = (productList: any) => { 
  return {
    type: actionTypes.UPDATE_CART_PRODUCT,
    productList: productList.sort((a: any, b: any) => a.id - b.id),
  }
};

const updateLoading = (loading: boolean) => { 
  return {
    type: actionTypes.UPDATE_LOADING,
    loading,
  }
};

export const addToCart = (product: any) => { 
  return (dispatch: any, getState: any) => { 
    const cartList = getState().cart.productList;
    dispatch(updateCart([...cartList, product]));
  };
};

export const removeFromCart = (product: any) => {
  return (dispatch: any, getState: any) => { 
    const cartList = getState().cart.productList;
    dispatch(updateCart(cartList.filter((item: any) => item.id !== product.id)));
  };
};

export const checkout = (data: any, callback: () => void) => { 
  return (dispatch: any) => { 
    console.log(data);
    dispatch(updateLoading(true));
    setTimeout(() => {
      dispatch(updateLoading(false));
      dispatch(updateCart([]));
      callback();
    }, 3000);
  };
};