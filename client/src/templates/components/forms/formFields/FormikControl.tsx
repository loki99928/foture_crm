import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Submit from "./Submit";

export type FormikControlType = {
    className?: string
    formik?: any
    type?: string
    label?: string
    name: string
    disabled?: boolean
}

export const FormikControlFields: React.FC<FormikControlType> = (props) => {
    switch (props.type) {
        case 'text':
        case 'email':
        case 'password':
            return <Input {...props}/>
        case 'radio':
        case 'checkbox':
            return <Checkbox {...props}/>
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
    switch (props.type) {
        case 'submit':
            return <Submit {...props}/>
        default: return null
    }
}
