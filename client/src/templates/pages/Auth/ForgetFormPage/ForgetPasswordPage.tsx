import React from "react";
import {compose} from "redux";

import s from "../../../components/forms/Form.module.scss";
import Forget from "../../../components/forms/ForgetForm/Forget";
import {withAuthRedirect} from "../../../../hoc/AuthRedirect";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {getMessage, getStatus} from "../../../../redux/reducer/auth/selectors";
import {ResultStatusCodeEnum} from "../../../../types/ApiUsersTypes";

const ForgetPasswordPage = () => {

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
            <Forget/>
        </main>
    )
}

export default compose(
    withAuthRedirect,
)(ForgetPasswordPage)