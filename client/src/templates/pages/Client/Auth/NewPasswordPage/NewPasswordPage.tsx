import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import s from "../../../../components/forms/util/Form.module.scss";
import NewPassword from "../../../../components/forms/NewPasswordForm/NewPassword";
import {actionsAuth} from "../../../../../redux/reducer/auth/actions";
import {getMessage} from "../../../../../redux/reducer/auth/selectors";

const NewPasswordPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {hashUser} = useParams()
    const message = useSelector(getMessage)

    useEffect(() => {
        dispatch(actionsAuth.checkTemporaryTokenRequest(hashUser))
    }, [])

    if (message) {
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

export default NewPasswordPage