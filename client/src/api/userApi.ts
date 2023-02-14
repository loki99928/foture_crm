import axios, {AxiosError} from "axios";
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
                // todo-dv  нужно удалить из ответа remember и messages
                return {
                    userId: res.data.userId,
                    accessToken: res.data.accessToken,
                    email: res.data.email
                }
            })
            .catch((e:AxiosError<IApiErrorResponse>) => {
                throw new Error(e.response?.data.message?.shift())
            })
    },
}
