import axios from "axios";

import * as actionTypes from '../actionTypes';

const updateProduct = (productList: object[]) => { 
  return {
    type: actionTypes.UPDATE_PRODUCT,
    productList,
  }
};

export const getProductList = () => { 
  return (dispatch: any) => { 
    axios
      .get('./fake/products.json')
      .then(res => {
        dispatch(updateProduct(res.data));
      })
      .catch(e => {
        console.log(e.message);
      });
  };
};