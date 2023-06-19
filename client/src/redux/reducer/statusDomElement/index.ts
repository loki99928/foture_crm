import {StatusDomElement, TInitialStateStatusDomElementReducer} from "./types";
import {InferActionTypes} from "../../store";
import {actionStatusDomElement} from "./actions";

export let initialStateStatusDomElementReducer = {
    openMenuMobile: false
} as TInitialStateStatusDomElementReducer

const StatusDomElementReducer = (state = initialStateStatusDomElementReducer, action: ActionTypeDomElementReducer): InitialStateType => {
    switch (action.type) {
        case StatusDomElement.OPEN_MOBILE_MENU:
            return {
                ...state,
                openMenuMobile: action.payload.status
            }
        default:
            return state
    }
}

export type InitialStateType = typeof initialStateStatusDomElementReducer
export type ActionTypeDomElementReducer = InferActionTypes<typeof actionStatusDomElement>

export default StatusDomElementReducer