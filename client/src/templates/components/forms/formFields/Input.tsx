import React from "react";
import {ErrorMessage, Field} from "formik";
import cn from "classnames"

import s from "../Form.module.scss"
import {FormikControlType} from "./FormikControl";

const Input: React.FC<FormikControlType> = props => {
    const {label, name, type, formik, ...rest} = props
    return (
        <div className={cn(s.formBlockField, s.formBlock__field, { [s.formFieldError] : formik.errors?.[name] && formik.touched?.[name] },{ [s.formFieldApproved] : !formik.errors?.[name] && formik.touched?.[name] })}>
            <input
                className={cn(s.formField)}
                name={name}
                type={type}
                autoComplete="on"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
            />
            <div className={cn(s.formLabel, {[s.formLabelStatic] : formik.values[name].length > 0})}>
                <label htmlFor={name}>{label}</label>
            </div>
            {formik.errors?.[name] ? (
                <div className={cn(s.formTextError, s.form__error)} data-testid="formTextError">
                    {formik.errors?.[name]}
                </div>
            ) : null}
        </div>
    )
}

export default Input