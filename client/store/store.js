import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware, { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';


//store: redux creates a store using the reducer defined above. it can accept changes using dispatch
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

export default store;