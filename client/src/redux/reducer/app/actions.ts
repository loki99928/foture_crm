import {InferActionTypes} from "../../store";
import {initialStateApp} from "./index";

export const SET_INITIALIZED_REQUEST = 'CRM/APP/SET_INITIALIZED_REQUEST'
export const SET_INITIALIZED_SUCCESS = 'CRM/APP/SET_INITIALIZED_SUCCESS'

export const actionsApp = {
    initializedRequest: () => ({type: SET_INITIALIZED_REQUEST} as const),
    initializedSuccess: () => ({type: SET_INITIALIZED_SUCCESS} as const)
}
export type InitialStateType = typeof initialStateApp
export type ActionTypeApp = InferActionTypes<typeof actionsApp>