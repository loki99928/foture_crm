import React, {useEffect} from "react";
import {compose} from "redux";
import {useNavigate} from "react-router";

import s from "../../../../components/forms/Form.module.scss";
import Register from "../../../../components/forms/RegisterForm/Register";
import {withAuthRedirect} from "../../../../../hoc/AuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {getMessage, getStatus} from "../../../../../redux/reducer/auth/selectors";
import {actionsAuth} from "../../../../../redux/reducer/auth/actions";
import {ResultStatusCodeEnum} from "../../../../../types/ApiUsersTypes";

const RegisterPage = () => {

    const navigate = useNavigate()
    const message = useSelector(getMessage)
    const status = useSelector(getStatus)

    console.log(status)

    if (status === ResultStatusCodeEnum.Success){
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

export default compose<React.ComponentType>(
    withAuthRedirect,
)(RegisterPage)
