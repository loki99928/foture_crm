import {InferActionTypes} from "../../store";
import {initialStateApp} from "./index";
import {appEnum} from "./types";


export const actionsApp = {
    initializedRequest: () => ({type: appEnum.SET_INITIALIZED_REQUEST} as const),
    initializedSuccess: () => ({type: appEnum.SET_INITIALIZED_SUCCESS} as const)
}
export type InitialStateType = typeof initialStateApp
export type ActionTypeApp = InferActionTypes<typeof actionsApp>