import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

import s from "../../../../components/forms/util/Form.module.scss";
import Register from "../../../../components/forms/RegisterForm";
import {getMessage, getStatus} from "../../../../../redux/reducer/auth/selectors";
import {ResultStatusCodeEnum} from "../../../../../types/ApiUsersTypes";

const RegisterPage = () => {

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

export default RegisterPage
