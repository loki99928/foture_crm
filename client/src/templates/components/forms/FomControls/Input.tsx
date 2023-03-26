import React from "react";
import cn from "classnames"

import s from "./Form.module.scss"

const Input: React.FC<any> = props => {
    const {handlers, errors, field, label, ...rest} = props

    const error = errors[props['field']]

    const value = handlers.watch(field)

    return (
        <div
            className={cn(s.formBlockField, s.formBlock__field, {[s.formFieldError]: error}, {[s.formFieldApproved]: !error && value?.length > 0})}>
            <input {...handlers.register(field)}
                   className={cn(s.formField)}
                   data-testid={`input_${field}`}
                   autoComplete="on"
                   {...rest}
            />
            {error && (
                <div className={cn(s.formTextError, s.form__error)} data-testid="formTextError">
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