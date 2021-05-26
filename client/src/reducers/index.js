//this file helps combine all the global state(reducers)
//to out app for easy access using redux

import {combineReducers} from "redux"
import authReducer from "./authReducer"

export default combineReducers({
   auth : authReducer 
})