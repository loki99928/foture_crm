import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

import s from "../../../../components/forms/FomControls/Form.module.scss";
import Register from "../../../../components/forms/RegisterForm/Register";
import {getMessage, getStatus} from "../../../../../redux/reducer/auth/selectors";
import {ResultStatusCodeEnum} from "../../../../../types/ApiUsersTypes";

export const RegisterPage = () => {

    const navigate = useNavigate()
    const message = useSelector(getMessage)
    const status = useSelector(getStatus)

    if (status === ResultStatusCodeEnum.Success) {
        navigate('/message', {
            state: {message}
        })
    }

    return (
        <main className={s.containerForm}>
            <Register/>
        </main>
    )
}
