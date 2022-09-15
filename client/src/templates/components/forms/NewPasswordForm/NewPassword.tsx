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

const SignupSchema = Yup.object().shape({
    password: Yup
        .string()
        .min(5, 'Too Short. Min length 5 symbol')
        .max(50, 'Too Long. Max length 50 symbol')
        .matches(/^(?=.*[a-z])/, "Must one Lowercase")
        .matches(/^(?=.*[A-Z])/, "Must one Uppercase")
        .matches(/^(?=.*[0-9])/, "Must One Number")
        .matches(/^(?=.*[!@#\$%\^&\*])/, "Must One Special Case Character(@, #, $, %, ^ ,&, *)")
        .required('Required'),
    double_password: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Password mismatch')
        .required('Required')
});

export const NewPassword: React.FC = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        onSubmit(values: IApiUsersCreateNewPasswordData): void | Promise<any> {
            formik.setSubmitting(true);
            // dispatch(actionsAuth.registerUserRequest(values))
            formik.setSubmitting(false);
        },
        initialValues: {
            password: '123123aA@',
            double_password: '123123aA@'
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
                    />
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="password"
                        label="Password confirmation"
                        name="double_password"
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


