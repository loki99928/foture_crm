import {ActionTypeUser, InitialStateType} from "./actions";
import {TUser, userEnum} from "./types";

export let initialStateUser = {
    userId: undefined,
    email: undefined,
    password: undefined,
    accessToken: undefined,
} as TUser
const UserReducer = (state = initialStateUser, action: ActionTypeUser): InitialStateType => {
    switch (action.type) {

        case userEnum.USER_UPDATE_REQUEST:
            return {
                ...state
            }
        case userEnum.USER_UPDATE_SUCCESS:
            return {
                ...state
            }
        case userEnum.USER_UPDATE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}

export default UserReducer