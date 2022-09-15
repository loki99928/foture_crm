import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import s from "../Form.module.scss"
import {FormikType} from "../FormType";
import {IApiUsersForgetData, IApiUsersRegisterData} from "../../../../types/ApiUsersTypes";
import {useDispatch} from "react-redux";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import bannerForm from "../../../assets/images/bg-head-form.jpg";
import {FormikControlBtn, FormikControlFields} from "../formFields/FormikControl";
import cn from "classnames";
import {ErrorResponse} from "../formFields/error";
import {NavLink} from "react-router-dom";

const SignupSchema = Yup.object().shape({
    email: Yup
        .string()
        .max(50, 'Too Long!')
        .email("Not a valid email")
        .required("Required")
});

const Forget: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionsAuth.clearForm())
    }, [])

    const formik = useFormik({
        initialValues: {email: 'loki99928@yandex.ru', mainError: null},
        onSubmit: async (values: IApiUsersForgetData) => {
            formik.setSubmitting(true);
            dispatch(actionsAuth.forgetUserRequest(values))
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
                <h2 className={s.formTitle}>Forgotten Your Password?</h2>
                <form onSubmit={formik.handleSubmit}>
                    <FormikControlFields
                        formik={formik}
                        className={cn(s.formField)}
                        type="text"
                        label="Your email"
                        name="email"
                    />
                    <ErrorResponse/>
                    <FormikControlBtn
                        label="Send Email"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                    />
                </form>
                <div className={cn(s.formFooter, s.footer__form)}>
                    <NavLink to="/auth/">Authorize</NavLink>
                    <NavLink to="/registration/">registration</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Forget

