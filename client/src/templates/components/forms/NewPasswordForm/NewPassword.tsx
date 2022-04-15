import React from "react";
import {NavLink} from "react-router-dom";
import {Form, Formik} from "formik";
import cn from "classnames"
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router";
import {useDispatch} from "react-redux";

import s from "../Form.module.scss"
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {FormikControlBtn, FormikControlFields} from "../FormikControl";
import {
    IApiUsersCreateNewPasswordData,
    IApiUsersCreateNewPasswordResponse,
    ResultStatusCodeEnum
} from "../../../../types/ApiUsersTypes";
import {FormikType} from "../FormType";
import {CreatingNewPasswordApi} from "../../../../redux/Thank/Auth";

const SignupSchema = Yup.object().shape({
    password: Yup
        .string()
        .min(5, 'Too Short. Min length 5 symbol')
        .max(50, 'Too Long. Max length 50 symbol')
        // todo-dv вернуть валидацию
        // .matches( /^(?=.*[a-z])/, "Must one Lowercase" )
        // .matches( /^(?=.*[A-Z])/, "Must one Uppercase" )
        // .matches( /^(?=.*[0-9])/, "Must One Number" )
        // .matches( /^(?=.*[!@#\$%\^&\*])/, "Must One Special Case Character(@, #, $, %, ^ ,&, *)" )
        .required('Required'),
    double_password: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Password mismatch')
        .required('Required')
});


export const NewPassword: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useParams()

    const initialValues = {password: '', double_password: '', token}

    async function creatingNewPassword(values: IApiUsersCreateNewPasswordData, formikEvent: FormikType) {
        let {setSubmitting, setFieldError} = formikEvent
        setSubmitting(true);
        const res = await dispatch(CreatingNewPasswordApi(values)) as unknown as IApiUsersCreateNewPasswordResponse

        if (res.statusCode === ResultStatusCodeEnum.Success){
            navigate('/message', {
                state: {
                    type: 'newPassword'
                } })
        }
        setSubmitting(false);
    }

    const onSubmit = async (values: IApiUsersCreateNewPasswordData, {setSubmitting, setFieldError}: FormikType) => {
        setSubmitting(false);
        await creatingNewPassword(values, {setSubmitting, setFieldError})
    }

    return (
        <div className={s.blockForm}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={SignupSchema}
                enableReinitialize
                validateOnBlur={true}
                validateOnChange={true}
            >
                {({
                      isSubmitting,
                      isValid,
                      errors,
                      touched,
                      values
                  }) => (
                    <Form>
                        <div className={s.formBanner}>
                            <img src={bannerForm} alt=""/>
                        </div>
                        <div className={s.containerFields}>
                            <h2 className={s.formTitle}>New password</h2>
                            <FormikControlFields
                                className={cn(s.formField)}
                                errors={errors}
                                touched={touched}
                                values={values}
                                control="input"
                                type="password"
                                label="Your password"
                                name="password"
                                htmlFor="password"
                            />
                            <FormikControlFields
                                className={cn(s.formField)}
                                errors={errors}
                                touched={touched}
                                values={values}
                                control="input"
                                type="password"
                                label="Confirm password"
                                name="double_password"
                                htmlFor="double_password"
                            />
                            <FormikControlBtn
                                control="submit"
                                label="Send"
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            />
                            <div className={cn(s.formFooter, s.footer__form)}>
                                <NavLink to="/auth/">Authorize</NavLink>
                                <NavLink to="/registration/">registration</NavLink>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


