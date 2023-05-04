import {IResponseServer} from "../../../types/ApiUsersTypes";
import {TUser, userEnum} from "./types";
import {InferActionTypes} from "../../store";
import {initialStateUser} from "./index";

export const actionsUser = {
    updateUserRequest: (user: TUser) => ({
        type: userEnum.USER_UPDATE_REQUEST,
        payload: user
    } as const),
    updateUserSuccess: ({message}: IResponseServer) => ({
        type: userEnum.USER_UPDATE_SUCCESS,
        payload: {message}
    } as const),
    updateUserFail: ({message}: IResponseServer) => ({
        type: userEnum.USER_UPDATE_FAIL,
        payload: {message}
    } as const)
}

export type InitialStateType = typeof initialStateUser
export type ActionTypeUser = InferActionTypes<typeof actionsUser>