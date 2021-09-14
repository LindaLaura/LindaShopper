import {LOAD_PRODUCT, LOAD_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FILTER_PRODUCTS} from '../actions/actionProduct';

const loadProducts = (products) => {
    return {
      type: LOAD_PRODUCTS,
      products,
    };
};

const loadProduct = (product) => {
    return {
      type: LOAD_PRODUCT,
      product,
    };
};

const createProduct = (product) => {
    return {
      type: CREATE_PRODUCT,
      product,
    };
};

const deleteProduct = (product) => {
    return {
      type: DELETE_PRODUCT,
      product,
    };
};

const editProduct = (product) => {
    return {
      type: EDIT_PRODUCT,
      product,
    };
};

export const findProducts = (productName) => {
    return {
      type: FILTER_PRODUCTS,
      productName,
    };
  };

export {loadProducts, loadProduct, createProduct, deleteProduct, editProduct, findProducts}