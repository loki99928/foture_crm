import React, {FC, useEffect, useState} from "react";
import cn from "classnames"

import s from "../util/Form.module.scss"
import Eye from "../../elements/eye";

const Input: FC<any> = props => {
    const {handlers, errors, field, label, ...rest} = props

    const error = errors[props['field']]
    const value = handlers.watch(field)

    const [showPassword, setShowPassword] = useState(false)

    const changeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const typeField = rest.type

    if (showPassword) {
        rest.type = 'text'
    }

    return (
        <div
            className={cn(s.formBlockField, s.formBlock__field, {[s.formFieldError]: error}, {[s.formFieldApproved]: !error && value?.length > 0})}>
            <input {...handlers.register(field)}
                   className={cn(s.formField)}
                   data-testid={`input_${field}`}
                   autoComplete="on"
                   {...rest}
            />
            {typeField === 'password' && <Eye showPassword={showPassword} eventClick={changeShowPassword}/>}
            {error && (
                <div className={cn(s.formTextError, s.form__error)} data-testid={`test_${field}`}>
                    <div className={cn(s.formTextError, s.formServer__error)}>
                        {error.message}
                    </div>
                </div>
            )}
            <div className={cn(s.formLabel, {[s.formLabelStatic]: value?.length > 0})}>
                <label htmlFor="email">{label}</label>
            </div>
        </div>
    )
}

export default Input