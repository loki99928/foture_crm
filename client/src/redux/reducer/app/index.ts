import {ActionTypeApp, InitialStateType, SET_INITIALIZED_SUCCESS,} from "./actions";

export let initialStateApp = {
    initialized: false as boolean,
}

const AppReducer = (state = initialStateApp, action: ActionTypeApp): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export default AppReducer

