import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import s from "../../../components/forms/Form.module.scss";
import {NewPassword} from "../../../components/forms/NewPasswordForm/NewPassword";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {getMessage, getStatus} from "../../../../redux/reducer/auth/selectors";
import {ResultStatusCodeEnum} from "../../../../types/ApiUsersTypes";
import {Preloader} from "../../../components/preloader/Preloader";

export const NewPasswordPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {temporaryToken} = useParams()
    const status = useSelector(getStatus)
    const message = useSelector(getMessage)

    useEffect(() => {
        dispatch(actionsAuth.checkTemporaryTokenRequest(temporaryToken))
    }, [])

    if (status === undefined){
        return (
            <Preloader/>
        );
    }


    if (status === ResultStatusCodeEnum.Error){
        navigate('/message', {
            state: {message}
        })
    }

    return (
        <main className={s.containerForm}>
            <NewPassword/>
        </main>
    )
}