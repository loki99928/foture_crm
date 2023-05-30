import {MESSAGE, RULE} from "./FormType";
import * as Yup from "yup";

export const validate = {
    email: Yup
        .string()
        .required(MESSAGE.PASSWORD_REQUIRED)
        .max(RULE.EMAIL_MAX_LENGTH, MESSAGE.EMAIL_TO_LONG)
        .email(MESSAGE.EMAIL_IS_NOT_VALID),
    password: Yup
        .string()
        .required(MESSAGE.PASSWORD_REQUIRED)
        .min(RULE.PASSWORD_MIN_LENGTH, MESSAGE.PASSWORD_MIN_LENGTH)
        .max(RULE.PASSWORD_MAX_LENGTH, MESSAGE.PASSWORD_MAX_LENGTH)
        .matches(RULE.PASSWORD_LOWERCASE, MESSAGE.PASSWORD_LOWERCASE)
        .matches(RULE.PASSWORD_UPPERCASE, MESSAGE.PASSWORD_UPPERCASE)
        .matches(RULE.PASSWORD_NUMBER, MESSAGE.PASSWORD_NUMBER)
        .matches(RULE.PASSWORD_SPECIAL_CASE, MESSAGE.PASSWORD_SPECIAL_CASE),
    double_password: Yup
        .string()
        .oneOf([Yup.ref('password')], MESSAGE.PASSWORD_MISMATCH)
        .required(MESSAGE.PASSWORD_REQUIRED),
    login: Yup
        .string()
        .required(MESSAGE.PASSWORD_REQUIRED)
        .min(RULE.NAME_MIN_LENGTH, MESSAGE.NAME_MIN_LENGTH)
        .max(RULE.NAME_MAX_LENGTH, MESSAGE.NAME_MAX_LENGTH)
} as const