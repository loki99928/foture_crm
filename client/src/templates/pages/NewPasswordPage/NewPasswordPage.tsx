import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import s from "../../components/forms/Form.module.scss";
import sp from "./NewpasswordPage.module.scss";
import {NewPassword} from "../../components/forms/NewPasswordForm/NewPassword";
import {IApiUsersChangeTokenNewPasswordResponse, ResultStatusCodeEnum} from "../../../types/ApiUsersTypes";
import {getIsLoad} from "../../../redux/Selectors/usersSelectors";
import {Preloader} from '../../components/preloader/Preloader'
import {validatePasswordToken} from "../../../redux/Thank/Auth";

export const NewPasswordPage = () => {

    const dispatch = useDispatch()
    const {token} = useParams()
    const navigate = useNavigate()
    const isLoadPage = useSelector(getIsLoad)

    useEffect(() => {
        if(!isLoadPage){
            (async () => {
                const result = await dispatch(validatePasswordToken(token)) as unknown as IApiUsersChangeTokenNewPasswordResponse
                if(result.statusCode === ResultStatusCodeEnum.Error){
                    navigate('/404')
                }
            })();
        }
    }, [])

    if (!isLoadPage){
        return (
            <div className={sp.pagePreloader}>
                <Preloader/>
            </div>

        )
    }

    return (
        <main className={s.containerForm}>
            <NewPassword/>
        </main>
    )
}