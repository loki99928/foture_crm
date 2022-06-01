import React from "react";
import {NavLink} from "react-router-dom";
import {Form, Formik} from "formik";
import cn from "classnames"
import * as Yup from "yup";

import s from "../Form.module.scss"
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {FormikControlBtn, FormikControlFields} from "../FormikControl";
import {IApiUserLoginData, IApiUserLoginResponse, ResultStatusCodeEnum} from "../../../../types/ApiUsersTypes";
import {FormikType} from "../FormType";
import {useDispatch} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../../../hoc/AuthRedirect";
import {AuthUserApi} from "../../../../redux/Thank/Auth";

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
        // todo-dv вернуть валидацию
        // .matches( /^(?=.*[a-z])/, "Must one Lowercase" )
        // .matches( /^(?=.*[A-Z])/, "Must one Uppercase" )
        // .matches( /^(?=.*[0-9])/, "Must One Number" )
        // .matches( /^(?=.*[!@#\$%\^&\*])/, "Must One Special Case Character(@, #, $, %, ^ ,&, *)" )
        .required('Required')
});


const Auth: React.FC = () => {

    const dispatch = useDispatch()
    // todo-dv разобраться с mainError
    const initialValues = {email: '', password: '', remember: false, mainError: null}

    const onSubmit = async (values: IApiUserLoginData, {setSubmitting, setFieldError}: FormikType) => {
        setSubmitting(false);
        await authenticateUser(values, {setSubmitting, setFieldError})
    }
    async function authenticateUser(values: IApiUserLoginData, formikEvent: FormikType) {

        let {setSubmitting, setFieldError} = formikEvent
        setSubmitting(true);
        const res = await dispatch(AuthUserApi(values)) as unknown as IApiUserLoginResponse

        if (res.status !== ResultStatusCodeEnum.Success){
            setFieldError('mainError', res.message)
        }
        setSubmitting(false);
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
                      values,
                  }) => (
                    <Form>
                        <div className={s.formBanner}>
                            <img src={bannerForm} alt=""/>
                        </div>
                        <div className={s.containerFields}>
                            <h2 className={s.formTitle}>Authorize Info</h2>
                            <FormikControlFields
                                className={cn(s.formField)}
                                errors={errors}
                                touched={touched}
                                values={values}
                                control="input"
                                type="email"
                                label="Your email"
                                name="email"
                                htmlFor="email"
                            />
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
                                className={cn(s.formFieldCheck)}
                                errors={errors}
                                touched={touched}
                                values={values}
                                control="checkbox"
                                type="checkbox"
                                label="remember me"
                                name="remember"
                                htmlFor="remember"
                            />
                            {
                                errors.mainError &&
                                <div className={cn(s.formTextError, s.formServer__error)}>
                                    {errors.mainError}
                                </div>
                            }
                            <FormikControlBtn
                                control="submit"
                                type="submit"
                                label="Send"
                                disabled={isSubmitting || !isValid}
                            />
                            <div className={cn(s.formFooter, s.footer__form)}>
                                <NavLink to="/registration/">registration</NavLink>
                                <NavLink to="/forget/">forget password</NavLink>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose<React.ComponentType>(
    withAuthRedirect,
)(Auth)