import { combineReducers } from "redux";
//import all reducer1 reducer2
import reducer1 from './reducer1'

const rootReducer = combineReducers({
 reducer1,
 //reducer2
});

export default rootReducer;