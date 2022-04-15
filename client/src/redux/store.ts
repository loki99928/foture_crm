import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import thankMiddleware, { ThunkAction } from 'redux-thunk'
import AuthReducer from "./Reducer/Auth";
import AppReducer from "./Reducer/App";

let rootReducer = combineReducers({
     AuthReducer,
     AppReducer,
})
export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,  composeEnhancers( applyMiddleware(thankMiddleware)))

export type InferActionTypes<T> = T extends {[key: string]: (...args: any[])=> infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<any>> = ThunkAction<R, AppStateType, unknown, A>

export default store