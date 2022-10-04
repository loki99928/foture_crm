const PASSWORD_RULE = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#\$%\^&\*])/

const PASSWORD_RULE_MESSAGE_REGEX = 'Password should have 1 lowercase, uppercase a number and one special case character(@, #, $, %, ^ ,&, *)'
const PASSWORD_RULE_MESSAGE_REQUIRED = 'Password is required'
const HASH_RULE_MESSAGE_REQUIRED = 'Token is required'
const PASSWORD_RULE_MESSAGE_MIN_LENGTH = 'Min length password 5 symbol'
const PASSWORD_RULE_MESSAGE_MAX_LENGTH = 'Max length password 50 symbol'

const EMAIL_RULE_MESSAGE_REQUIRED = 'Email is required'
const EMAIL_RULE_MESSAGE_INCORRECT = 'Incorrect email'

const REMEMBER_RULE_MESSAGE_REQUIRED = 'Data is not validate'

export const REGEX = {
    PASSWORD_RULE
}

export const MESSAGE = {
    PASSWORD_RULE_MESSAGE_REGEX,
    PASSWORD_RULE_MESSAGE_REQUIRED,
    HASH_RULE_MESSAGE_REQUIRED,
    PASSWORD_RULE_MESSAGE_MIN_LENGTH,
    PASSWORD_RULE_MESSAGE_MAX_LENGTH,
    EMAIL_RULE_MESSAGE_REQUIRED,
    EMAIL_RULE_MESSAGE_INCORRECT,
    REMEMBER_RULE_MESSAGE_REQUIRED
}