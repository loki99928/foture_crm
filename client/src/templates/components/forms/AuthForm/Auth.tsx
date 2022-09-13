import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {Form, Formik, useFormik} from "formik";
import cn from "classnames"
import * as Yup from "yup";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";

import s from "../Form.module.scss"
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {FormikControlBtn, FormikControlFields} from "../formFields/FormikControl";
import {IApiUserLoginData, IApiUsersRegisterData} from "../../../../types/ApiUsersTypes";
import {FormikType} from "../FormType";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import { getUser} from "../../../../redux/reducer/auth/selectors";
import {withAuthRedirect} from "../../../../hoc/AuthRedirect";
import {ErrorResponse} from "../formFields/error";

const SignupSchema = Yup.object().shape({
    email: Yup
        .string()
        .max(50, 'Too Long!')
        .email("Not a valid email")
        .required("Required")
    ,
    password: Yup
        .string()
        .min(5, 'Too Short. Min length 5 symbol')
        .max(50, 'Too Long. Max length 50 symbol')
        .matches( /^(?=.*[a-z])/, "Must one Lowercase" )
        .matches( /^(?=.*[A-Z])/, "Must one Uppercase" )
        .matches( /^(?=.*[0-9])/, "Must One Number" )
        .matches( /^(?=.*[!@#\$%\^&\*])/, "Must One Special Case Character(@, #, $, %, ^ ,&, *)" )
        .required('Required')
});

const Auth: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionsAuth.clearForm())
    }, [])

    const formik = useFormik({
        initialValues: {email: 'loki99928@yandex.ru', password: '123123aA@', remember: false, mainError: null},
        onSubmit: async (values: IApiUsersRegisterData) => {
            formik.setSubmitting(true);
            dispatch(actionsAuth.authUserRequest(values))
        },
        validationSchema: SignupSchema,
        validateOnBlur: true,
        validateOnChange: true
    });

    return (
        <div className={s.blockForm}>
            <div className={s.formBanner}>
                <img src={bannerForm} alt=""/>
            </div>
            <div className={s.containerFields}>
                <h2 className={s.formTitle}>Authorize Info</h2>
                <form onSubmit={formik.handleSubmit}>
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="text"
                        label="Your email"
                        name="email"
                    />
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="password"
                        label="Your password"
                        name="password"
                    />
                    <FormikControlFields
                        className={cn(s.formFieldCheck)}
                        type="checkbox"
                        label="remember me"
                        name="remember"
                    />
                    <ErrorResponse/>
                    <FormikControlBtn
                        label="Send"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                    />
                </form>
                <div className={cn(s.formFooter, s.footer__form)}>
                    <NavLink to="/registration/">registration</NavLink>
                    <NavLink to="/forget/">forget password</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Auth
