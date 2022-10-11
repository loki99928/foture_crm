import React from "react";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import cn from "classnames"
import * as Yup from "yup";
import {useDispatch} from "react-redux";

import s from "../Form.module.scss"
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {FormikControlBtn, FormikControlFields} from "../formFields/FormikControl";
import {IApiUsersCreateNewPasswordData} from "../../../../types/ApiUsersTypes";
import {ErrorResponse} from "../formFields/error";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {useParams} from "react-router";
import {MESSAGE, REGEX} from "../form.utils";

const SignupSchema = Yup.object().shape({
    password: Yup
        .string()
        .min(REGEX.PASSWORD_MIN_LENGTH, MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH)
        .max(REGEX.PASSWORD_MAX_LENGTH, MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH)
        .matches( REGEX.PASSWORD_LOWERCASE, MESSAGE.PASSWORD_RULE_MESSAGE_LOWERCASE )
        .matches( REGEX.PASSWORD_UPPERCASE, MESSAGE.PASSWORD_RULE_MESSAGE_UPPERCASE )
        .matches( REGEX.PASSWORD_NUMBER, MESSAGE.PASSWORD_RULE_MESSAGE_NUMBER )
        .matches( REGEX.PASSWORD_SPECIAL_CASE, MESSAGE.PASSWORD_RULE_MESSAGE_SPECIAL_CASE)
        .required(MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED),
    double_password: Yup
        .string()
        .oneOf([Yup.ref('password')], MESSAGE.PASSWORD_RULE_MESSAGE_MISMATCH)
        .required(MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED)
});

// todo-dv нужно разобраться при не совпадение паролей выводит две ошибки
export const NewPassword: React.FC = () => {

    const dispatch = useDispatch()
    const {hashUser} = useParams()

    const formik = useFormik({
        onSubmit(values: IApiUsersCreateNewPasswordData): void | Promise<any> {
            formik.setSubmitting(true);
            const arrRequest = {
                password: values.password,
                double_password: values.double_password,
                hashUser
            }
            dispatch(actionsAuth.createNewPasswordResponse(arrRequest))
            formik.setSubmitting(false);
        },
        initialValues: {
            password: '',
            double_password: ''
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
                <h2 className={s.formTitle}>Create New Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="password"
                        label="Your password"
                        name="password"
                        data-testid="input_password"
                    />
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="password"
                        label="Password confirmation"
                        name="double_password"
                        data-testid="input_double_password"
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
                    <NavLink to="/registration/">Registration</NavLink>
                </div>
            </div>
        </div>
    )
}


