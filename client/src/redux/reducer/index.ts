import {combineReducers} from "redux";
import AuthReducer from "./auth";
import AppReducer from "./app";

export const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
})