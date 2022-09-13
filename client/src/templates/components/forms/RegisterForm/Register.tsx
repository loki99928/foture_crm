import React, {useEffect} from "react";
import {useFormik} from "formik";
import cn from "classnames"
import {NavLink} from "react-router-dom";
import * as Yup from "yup";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";

import {FormikControlBtn, FormikControlFields} from "../formFields/FormikControl";
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {IApiUsersRegisterData} from "../../../../types/ApiUsersTypes";
import {ErrorResponse} from "../formFields/error";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {getIsLoad, getMessage, getStatus} from "../../../../redux/reducer/auth/selectors";
import s from "../Form.module.scss"

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
        .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, "Password should have 1 lowercase, uppercase a number and one special case character(@, #, $, %, ^ ,&, *)" )
        .required('Required')
});

const Register: React.FC = () => {

    const dispatch = useDispatch()

    let load = useSelector(getIsLoad)
    let message = useSelector(getMessage)
    let status = useSelector(getStatus)

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
            password: '123123aA@'
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
                    />
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="password"
                        label="Your password"
                        name="password"
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
