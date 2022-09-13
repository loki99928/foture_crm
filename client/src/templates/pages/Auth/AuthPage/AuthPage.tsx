import React from "react";
import {compose} from "redux";

import s from "../../../components/forms/Form.module.scss";
import Auth from "../../../components/forms/AuthForm/Auth";
import {withAuthRedirect} from "../../../../hoc/AuthRedirect";

const AuthPage = () => {
    return (
        <main className={s.containerForm}>
            <Auth/>
        </main>
    )
}

export default compose<React.ComponentType>(
    withAuthRedirect,
)(AuthPage)