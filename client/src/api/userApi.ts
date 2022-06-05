import axios, {AxiosError, AxiosResponse} from "axios";
import {IApiErrorResponse, IApiUsersGetResponse} from "../types/ApiUsersTypes";

const instance = axios.create({
    baseURL: '/user/'
});



export const userApi = {

    /**
     * проверка авторизации пользователя по token
     *
     * @param token
     * @returns {*}
     */
    get(token: string) {
        return instance.get<IApiUsersGetResponse & IApiErrorResponse>(
            '',
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }
        )
            .then(res => {
                return {
                    userId: res.data.userId,
                    accessToken: res.data.accessToken,
                    email: res.data.email,
                    message: res.data.message
                }
            })
            .catch((e:AxiosError<IApiErrorResponse>): IApiUsersGetResponse => {
                return {
                    message: e.response?.data.message?.shift()
                }
            })
    },
}
