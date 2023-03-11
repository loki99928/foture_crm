import {applyMiddleware, compose, createStore} from "redux"
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./sagas";
import {rootReducer} from "./reducer";

const sagaMiddleware = createSagaMiddleware()

export type StateType = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export default store