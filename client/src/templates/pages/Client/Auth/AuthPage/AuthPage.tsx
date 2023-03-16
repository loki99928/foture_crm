import React from "react";

import s from "../../../../components/forms/FomControls/Form.module.scss";
import Auth from "../../../../components/forms/AuthForm/Auth";

export const AuthPage = () => {
    return (
        <main className={s.containerForm}>
            <Auth/>
        </main>
    )
}
