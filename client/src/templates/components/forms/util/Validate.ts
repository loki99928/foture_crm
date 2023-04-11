import {MESSAGE, RULE} from "./FormType";
import * as Yup from "yup";

interface IValidate {
    email?: any | Yup.ISchema <any, any, any, any>
    password?: any | Yup.ISchema <any, any, any, any>
    double_password?: any | Yup.ISchema <any, any, any, any>
}

export const validate: IValidate = {
    email: Yup
        .string()
        .max(RULE.EMAIL_MAX_LENGTH, MESSAGE.EMAIL_TO_LONG)
        .email(MESSAGE.EMAIL_IS_NOT_VALID)
        .required(MESSAGE.EMAIL_REQUIRED),
    password: Yup
        .string()
        .min(RULE.PASSWORD_MIN_LENGTH, MESSAGE.PASSWORD_MIN_LENGTH)
        .max(RULE.PASSWORD_MAX_LENGTH, MESSAGE.PASSWORD_MAX_LENGTH)
        .matches( RULE.PASSWORD_LOWERCASE, MESSAGE.PASSWORD_LOWERCASE )
        .matches( RULE.PASSWORD_UPPERCASE, MESSAGE.PASSWORD_UPPERCASE )
        .matches( RULE.PASSWORD_NUMBER, MESSAGE.PASSWORD_NUMBER )
        .matches( RULE.PASSWORD_SPECIAL_CASE, MESSAGE.PASSWORD_SPECIAL_CASE)
        .required(MESSAGE.PASSWORD_REQUIRED),
    double_password: Yup
        .string()
        .oneOf([Yup.ref('password')], MESSAGE.PASSWORD_MISMATCH)
        .required(MESSAGE.PASSWORD_REQUIRED)
}