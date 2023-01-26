import React from "react";
import cn from "classnames"

import s from "../Form.module.scss"
import {FormikControlType} from "./FormikControl";

const Checkbox: React.FC<FormikControlType> = (props) => {
    const {label, name, type, formik, ...rest} = props
    return (
        <div className={cn(s.formBlockCheck, s.formBlock__check)}>
            <div>
                <label className={cn(s.formContainerCheck)}>
                    <input type={type}
                           name={name}
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           checked={formik.values[name]}
                           value={formik.values[name]}
                           {...rest}
                    />
                    <span className={cn(s.formCheckStyle, s.form__check)}></span>
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Checkbox