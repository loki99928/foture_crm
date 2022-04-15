import React from "react";

import Auth from "../../components/forms/AuthForm/Auth";
import s from "../../components/forms/Form.module.scss";

export const AuthPage = () => {
    return (
        <main className={s.containerForm}>
            <Auth/>
        </main>
    )
}