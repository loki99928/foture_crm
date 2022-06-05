import React from "react";
import {Form, Formik} from "formik";
import cn from "classnames"
import {NavLink} from "react-router-dom";
import * as Yup from "yup";
import {useNavigate} from 'react-router';

import {FormikControlBtn, FormikControlFields} from "../FormikControl";
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import s from "../Form.module.scss"
import {ResultStatusCodeEnum, IApiUsersRegisterData, IResponseServer} from "../../../../types/ApiUsersTypes";
import {FormikType} from "../FormType";
import {useDispatch} from "react-redux";
import {RegisterUserApi} from "../../../../redux/Thank/Auth";

const SignupSchema = Yup.object().shape({
    email: Yup
        .string()
        .max(50, 'Too Long!')
        // .email("Not a valid email")
        .required("Required")
    ,
    password: Yup
        .string()
    // todo-dv вернуть валидацию
        // .min(5, 'Too Short. Min length 5 symbol')
        // .max(50, 'Too Long. Max length 50 symbol')
        // .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, "Password should have 1 lowercase, uppercase a number and one special case character(@, #, $, %, ^ ,&, *)" )
        // .required('Required')
});

const Register: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialValues = {email: '', password: '', mainError: null}

    async function handleRegistrationUser(values: IApiUsersRegisterData, formikEvent: FormikType) {
        let {setSubmitting, setFieldError} = formikEvent
        setSubmitting(true);
        const res = await dispatch(RegisterUserApi(values)) as unknown as IResponseServer
        switch (res.status) {
            case ResultStatusCodeEnum.Created:
                navigate('/message', {
                    state: {
                        type: 'sendMail'
                    }
                })
                break
            case ResultStatusCodeEnum.Error:
                setFieldError('mainError',  'The user with the same email is busy')
                break
            case ResultStatusCodeEnum.FORBIDDEN:
                setFieldError('mainError',  'Error send mail')
        }
        if (res.status === ResultStatusCodeEnum.Created){
            navigate('/message', {
                state: {
                    type: 'sendMail'
                }
            })
        } else if (res.message){
            setFieldError('mainError',  res.message)
        }
        setSubmitting(false);
    }

    const onSubmit = async (values: IApiUsersRegisterData, {setSubmitting, setFieldError}: FormikType) => {
        setSubmitting(false);
        await handleRegistrationUser(values, {setSubmitting, setFieldError})
    }
    return (
        <div className={s.blockForm}>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={SignupSchema}
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
                            <h2 className={s.formTitle}>Registration Info</h2>
                            <FormikControlFields
                                className={cn(s.formField)}
                                errors={errors}
                                touched={touched}
                                values={values}
                                control="input"
                                type="text"
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
                            {
                                errors.mainError &&
                                <div className={cn(s.formTextError, s.formServer__error)}>
                                    {errors.mainError}
                                </div>
                            }
                            <FormikControlBtn
                                control="submit"
                                label="Send"
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            />
                            <div className={cn(s.formFooter, s.footer__form)}>
                                <NavLink to="/auth/">Authorize</NavLink>
                                <NavLink to="/forget/">forget password</NavLink>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register

