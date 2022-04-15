import React from "react";
import {ErrorMessage, Field} from "formik";
import cn from "classnames"

import s from "../Form.module.scss"
import {FormikControlType} from "../FormikControl";

const Input: React.FC<FormikControlType> = props => {
    const {label, name, type, errors, touched, values, ...rest} = props
    return (
        <div className={cn(s.formBlockField, s.formBlock__field, { [s.formFieldError] : errors?.[name] && touched?.[name] },{ [s.formFieldApproved] : !errors?.[name] && touched?.[name] })}>
            <Field name={name} id={name} type={type} {...rest}  data-testid={"input_" + name} autocomplete="on"/>
            <div className={cn(s.formLabel, {[s.formLabelStatic] : values?.[name].length > 0})}>
                <label htmlFor={name}>{label}</label>
            </div>
            {errors?.[name] && touched?.[name] ? (
                <div className={cn(s.formTextError, s.form__error)} data-testid="formTextError">
                    <ErrorMessage name={name}></ErrorMessage>
                </div>
            ) : null}
        </div>
    )
}

export default Input