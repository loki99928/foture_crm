import {InferActionTypes} from "../store";
import {initialStateApp} from "../Reducer/App";

export const actions = {
    toggleInitialized: () => ({type: 'CRM/APP/SET_INITIALIZED'} as const)
}
export type InitialStateType = typeof initialStateApp
export type ActionTypeApp = InferActionTypes<typeof actions>