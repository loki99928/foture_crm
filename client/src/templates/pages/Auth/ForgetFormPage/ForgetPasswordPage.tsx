import React from "react";
import {compose} from "redux";

import s from "../../../components/forms/Form.module.scss";
import Forget from "../../../components/forms/ForgetForm/Forget";
import {withAuthRedirect} from "../../../../hoc/AuthRedirect";

const ForgetPasswordPage = () => {
    return (
        <main className={s.containerForm}>
            <Forget/>
        </main>
    )
}

export default compose(
    withAuthRedirect,
)(ForgetPasswordPage)