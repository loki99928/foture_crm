import React, {useEffect} from "react";
import {useFormik} from "formik";
import cn from "classnames"
import {NavLink} from "react-router-dom";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";

import {FormikControlBtn, FormikControlFields} from "../formFields/FormikControl";
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {IApiUsersRegisterData} from "../../../../types/ApiUsersTypes";
import {ErrorResponse} from "../formFields/error";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {getMessage} from "../../../../redux/reducer/auth/selectors";
import s from "../Form.module.scss"
import {MESSAGE, REGEX} from "../form.utils";

const SignupSchema = Yup.object().shape({
    email: Yup
        .string()
        .max(REGEX.EMAIL_MAX_LENGTH, MESSAGE.EMAIL_RULE_MESSAGE_TO_LONG)
        .email(MESSAGE.EMAIL_RULE_MESSAGE_NOT_VALID)
        .required(MESSAGE.EMAIL_RULE_MESSAGE_REQUIRED)
    ,
    password: Yup
        .string()
        .min(REGEX.PASSWORD_MIN_LENGTH, MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH)
        .max(REGEX.PASSWORD_MAX_LENGTH, MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH)
        .matches( REGEX.PASSWORD_LOWERCASE, MESSAGE.PASSWORD_RULE_MESSAGE_LOWERCASE )
        .matches( REGEX.PASSWORD_UPPERCASE, MESSAGE.PASSWORD_RULE_MESSAGE_UPPERCASE )
        .matches( REGEX.PASSWORD_NUMBER, MESSAGE.PASSWORD_RULE_MESSAGE_NUMBER )
        .matches( REGEX.PASSWORD_SPECIAL_CASE, MESSAGE.PASSWORD_RULE_MESSAGE_SPECIAL_CASE)
        .required(MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED),
});

const Register: React.FC = () => {

    const dispatch = useDispatch()

    let message = useSelector(getMessage)

    useEffect(() => {
        dispatch(actionsAuth.clearForm())
    }, [])

    const formik = useFormik({
        onSubmit(values: IApiUsersRegisterData): void | Promise<any> {
            formik.setSubmitting(true);
            dispatch(actionsAuth.registerUserRequest(values))
        },
        initialValues: {
            email: 'loki99928@yandex.ru',
            password: '123qW2@'
        },
        validationSchema: SignupSchema,
        validateOnBlur: true,
        validateOnChange: true
    });

    useEffect(() => {
        formik.resetForm()
    }, [message])

    return (
        <div className={s.blockForm}>
            <div className={s.formBanner}>
                <img src={bannerForm} alt=""/>
            </div>
            <div className={s.containerFields}>
                <h2 className={s.formTitle}>Registration Info</h2>
                <form onSubmit={formik.handleSubmit}>
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="text"
                        label="Your email"
                        name="email"
                        data-testid="input_email"
                    />
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="password"
                        label="Your password"
                        name="password"
                        data-testid="input_password"
                    />
                    <ErrorResponse/>
                    <FormikControlBtn
                        label="Send"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                    />
                </form>
                <div className={cn(s.formFooter, s.footer__form)}>
                    <NavLink to="/auth/">Authorize</NavLink>
                    <NavLink to="/forget/">forget password</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Register
