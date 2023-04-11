import React from "react";

import s from "../../../../components/forms/util/Form.module.scss";
import Auth from "../../../../components/forms/AuthForm";

const AuthPage = () => {
    return (
        <main className={s.containerForm}>
            <Auth/>
        </main>
    )
}

export default AuthPage;
