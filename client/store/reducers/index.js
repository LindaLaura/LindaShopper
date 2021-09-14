import { combineReducers } from "redux";
//import all reducer1 reducer2
import reducerProduct from './reducerProduct'

const rootReducer = combineReducers({
 reducerProduct,
 //reducer2
});

export default rootReducer;