import {ActionTypeApp, InitialStateType} from "../Actions/App";

export let initialStateApp = {
    initialized: false as boolean,
}

const AppReducer = (state = initialStateApp, action: ActionTypeApp): InitialStateType => {
    switch (action.type) {
        case 'CRM/APP/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export default AppReducer

