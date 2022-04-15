import React from "react";

import s from "../../components/forms/Form.module.scss";
import Forget from "../../components/forms/ForgetForm/Forget";

export const ForgetPasswordPage = () => {
    return (
        <main className={s.containerForm}>
            <Forget/>
        </main>
    )
}