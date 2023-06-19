import {combineReducers} from "redux";
import AuthReducer from "./auth";
import AppReducer from "./app";
import StatusDomElementReducer from "./statusDomElement";

export const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    statusDom: StatusDomElementReducer
})
