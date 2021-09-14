import {LOAD_PRODUCTS, LOAD_PRODUCT, CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FILTER_PRODUCTS} from '../actions/actionProduct';

const initialState = {
      products:[],
      singleProduct: {}
}

const reducerProduct = (state = initialState, action) => {
      if(action.type === LOAD_PRODUCTS){
            return { ...state, products: action.products };
      }
      else if(action.type === LOAD_PRODUCT){
            return {...state, singleProduct: action.product };
      }
      else if(action.type === CREATE_PRODUCT){
            return {...state, products:[...state.products ,action.product]}
      }
      return state;
};
  
  

export default reducerProduct;