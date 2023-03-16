import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import s from "../../../../components/forms/FomControls/Form.module.scss";
import {NewPassword} from "../../../../components/forms/NewPasswordForm/NewPassword";
import {actionsAuth} from "../../../../../redux/reducer/auth/actions";
import {getMessage, getStatus} from "../../../../../redux/reducer/auth/selectors";

export const NewPasswordPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {hashUser} = useParams()
    const status = useSelector(getStatus)
    const message = useSelector(getMessage)

    useEffect(() => {
        dispatch(actionsAuth.checkTemporaryTokenRequest(hashUser))
    }, [])

    if (message){
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