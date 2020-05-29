/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import mobileReducer from './mobileReducer';
import authReducer from './authReducer';
import registrationReducer from './registrationReducer';
import search from "./searchReducer";
import car from "./carReducer";
import modal from "./modalReducer"
import cart from "./cartReducer"

// WBA3A5G55CNP16177
export default combineReducers({
 simpleReducer,
 isMobile: mobileReducer,
 auth: authReducer,
 registration: registrationReducer,
 search,
 car,
 cart,
 modal
});