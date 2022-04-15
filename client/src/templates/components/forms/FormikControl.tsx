import React from "react";
import Input from "./formFields/Input";
import Checkbox from "./formFields/Checkbox";
import Submit from "./formFields/Submit";
import {FormikErrors, FormikTouched, FormikValues,} from "formik";

export type FormikControlType = {
    control?: string
    className?: string
    errors?: FormikErrors<any>
    touched?: FormikTouched<any>
    values?: FormikValues
    type?: string
    label?: string
    name: string
    disabled?: boolean
    htmlFor?: string | undefined
}

export const FormikControlFields: React.FC<FormikControlType> = (props) => {
    const {control, ...rest} = props
    switch (control) {
        case 'input':
            return <Input {...rest}/>
        case 'textarea':
        case 'radio':
        case 'checkbox':
            return <Checkbox {...rest}/>
        default: return null
    }
}

export type FormikControlTypeBtn = {
    control?: string
    type: "button" | "submit" | "reset" | undefined
    label?: string
    disabled?: boolean
}

export const FormikControlBtn: React.FC<FormikControlTypeBtn> = (props) => {
    const {control, ...rest} = props
    switch (control) {
        case 'submit':
            return <Submit {...rest}/>
        default: return null
    }
}
