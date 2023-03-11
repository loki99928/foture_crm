import {ActionTypeApp, InitialStateType} from "./actions";
import {appEnum} from "./types";

export let initialStateApp = {
    initialized: false as boolean,
}

const AppReducer = (state = initialStateApp, action: ActionTypeApp): InitialStateType => {
    switch (action.type) {
        case appEnum.SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export default AppReducer

