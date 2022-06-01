import React from "react";
import {NavLink} from "react-router-dom";
import {Form, Formik} from "formik";
import cn from "classnames"
import * as Yup from "yup";
import {useNavigate} from "react-router";

import {FormikControlBtn, FormikControlFields} from "../FormikControl";
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import s from "../Form.module.scss"
import {FormikType} from "../FormType";
import {IApiUsersForgetData, IResponseServer, ResultStatusCodeEnum} from "../../../../types/ApiUsersTypes";
import {useDispatch} from "react-redux";
import {ForgetUserApi} from "../../../../redux/Thank/Auth";

const SignupSchema = Yup.object().shape({
    email: Yup
        .string()
        .max(50, 'Too Long!')
        .email("Not a valid email")
        .required("Required")
});

const Forget: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialValues = {email: ''}

    async function handleForgetUser(values: IApiUsersForgetData, formikEvent: FormikType) {
        let {setSubmitting, setFieldError} = formikEvent
        setSubmitting(false)
        const response = await dispatch(ForgetUserApi(values)) as unknown as IResponseServer

        if (response.status === ResultStatusCodeEnum.Success){
            navigate('/message', {
                state: {
                    type: 'forgetPassword'
                } })
        } else {
            let listError = response.message;
            // for (const listErrorKey in listError) {
            //     setFieldError(listErrorKey, listError[listErrorKey])
            // }
        }
        setSubmitting(true)
    }

    const onSubmit = async (values: IApiUsersForgetData, {setSubmitting, setFieldError}: FormikType) => {
        setSubmitting(false);
        await handleForgetUser(values, {setSubmitting, setFieldError})
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
                            <h2 className={s.formTitle}>Forget password </h2>
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

export default Forget

