import React from "react";

import s from "../../components/forms/Form.module.scss";
import Register from "../../components/forms/RegisterForm/Register";

export const RegisterPage = () => {
    return (
        <main className={s.containerForm}>
            <Register/>
        </main>
    )
}