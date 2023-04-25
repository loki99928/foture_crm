export const RULE = {
    EMAIL_MAX_LENGTH: 50,
    EMAIL_SPECIAL_CASE: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    PASSWORD_MIN_LENGTH: 5,
    PASSWORD_MAX_LENGTH: 50,
    PASSWORD_LOWERCASE: /^(?=.*[a-z])/,
    PASSWORD_UPPERCASE: /^(?=.*[A-Z])/,
    PASSWORD_NUMBER: /^(?=.*[0-9])/,
    PASSWORD_SPECIAL_CASE: /^(?=.*[!@#$%^&*])/,
    NAME_MIN_LENGTH: 5,
    NAME_MAX_LENGTH: 50,
}

export const MESSAGE = {
    EMAIL_REQUIRED: 'Required',
    EMAIL_TO_SHORT: 'Too Short. Min length 5 symbol',
    EMAIL_TO_LONG: 'Too Long. Max length 50 symbol',
    EMAIL_IS_NOT_VALID: 'Email is not valid',
    PASSWORD_REQUIRED: 'Required',
    PASSWORD_MIN_LENGTH: 'Too Short. Min length 5 symbol',
    PASSWORD_MAX_LENGTH: 'Too Long. Max length 50 symbol',
    PASSWORD_SPECIAL_CASE: 'Must One Special Case Character(@, #, $, %, ^ ,&, *)',
    PASSWORD_MISMATCH: 'Password mismatch',
    PASSWORD_LOWERCASE: 'Must one Lowercase',
    PASSWORD_UPPERCASE: 'Must one Uppercase',
    PASSWORD_NUMBER: 'Must One Number',
    NAME_MIN_LENGTH: 'Too Short. Min length 5 symbol',
    NAME_MAX_LENGTH: 'Too Long. Max length 50 symbol',
}

export interface fieldsFormAuth {
    email: string
    password: string
}

export interface fieldsFormRegister {
    email: string
    password: string
}

export interface fieldsFormForget {
    email: string
}

export interface fieldsFormNewPassword {
    password: string
    double_password: string
}

export interface fieldsSearchForm {
    search: string
}

export interface fieldsUserSettingsForm {
    email: string
    password: string
    double_password: string
    login: string
}
export type FormikType = {
    setFieldError: (field: string, errorMsg: string) => void
    setSubmitting: (isSubmitting: boolean) => void
}