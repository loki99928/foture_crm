import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

import {actionsAuth} from "../../../../../redux/reducer/auth/actions";
import {getMessage, getStatus} from "../../../../../redux/reducer/auth/selectors";

let UserConfirmationPage: React.FC = () => {

    const navigate = useNavigate()
    const {hashUser} = useParams()
    const dispatch = useDispatch()

    const message = useSelector(getMessage)
    const status = useSelector(getStatus)

    if (message) {
        navigate('/message', {
            state: {message}
        })
    }

    useEffect(() => {
        if (hashUser === undefined) return;
        dispatch(actionsAuth.confirmUserRequest(hashUser))
    }, [])

    return (
        <main>
        </main>
    )
}

export default UserConfirmationPage