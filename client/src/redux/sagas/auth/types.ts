import {IApiUsersRegisterData} from "../../../types/ApiUsersTypes";

export type TRegisterUser = {
    type: string,
    payload: {
        user: IApiUsersRegisterData
    }
}