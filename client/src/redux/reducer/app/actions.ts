import {InferActionTypes} from "../../store";
import {initialStateApp} from "./index";

export enum appEnum {
    SET_INITIALIZED_REQUEST = 'CRM/APP/SET_INITIALIZED_REQUEST',
    SET_INITIALIZED_SUCCESS = 'CRM/APP/SET_INITIALIZED_SUCCESS'
}

export const actionsApp = {
    initializedRequest: () => ({type: appEnum.SET_INITIALIZED_REQUEST} as const),
    initializedSuccess: () => ({type: appEnum.SET_INITIALIZED_SUCCESS} as const)
}
export type InitialStateType = typeof initialStateApp
export type ActionTypeApp = InferActionTypes<typeof actionsApp>