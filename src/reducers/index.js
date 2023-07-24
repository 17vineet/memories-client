import { combineReducers } from "redux";

import posts from './posts' ;
import auth from './auth' ;

const reducer = combineReducers({
    posts : posts , // posts, 
    auth : auth
}) ; 

export default reducer ;

// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.

// The resulting reducer calls every child reducer, and gathers their results into a single state object. The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers