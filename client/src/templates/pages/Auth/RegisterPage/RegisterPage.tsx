import React, {useEffect} from "react";
import {compose} from "redux";

import s from "../../../components/forms/Form.module.scss";
import Register from "../../../components/forms/RegisterForm/Register";
import {withAuthRedirect} from "../../../../hoc/AuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {getMessage, getStatus} from "../../../../redux/reducer/auth/selectors";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {ResultStatusCodeEnum} from "../../../../types/ApiUsersTypes";
import {useNavigate} from "react-router";

const RegisterPage = () => {

    const navigate = useNavigate()
    const message = useSelector(getMessage)
    const status = useSelector(getStatus)

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
