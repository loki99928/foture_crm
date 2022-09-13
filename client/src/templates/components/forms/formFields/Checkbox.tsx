import React from "react";
import {ErrorMessage, Field} from "formik";
import cn from "classnames"

import s from "../Form.module.scss"
import {FormikControlType} from "./FormikControl";

const Input: React.FC<FormikControlType> = (props) => {
    const {label, name, type, ...rest} = props
    return (
        <div className={cn(s.formBlockCheck, s.formBlock__check)}>
            <div>
                <label className={cn(s.formContainerCheck)}>
                    <input type={type} name={name} {...rest}/>
                    <span className={cn(s.formCheckStyle, s.form__check)}></span>
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Input