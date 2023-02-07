import {IsNotEmpty, Matches, MaxLength, MinLength} from "class-validator";
import {MESSAGE, REGEX} from "../auth.utils";

export class NewPasswordUserDTO {

    @IsNotEmpty({message: MESSAGE.HASH_RULE_MESSAGE_REQUIRED})
    readonly hashUser: string

    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    @MinLength(5, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH})
    @MaxLength(50, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH})
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE_REGEX})
    readonly password: string

    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    @MinLength(5, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH})
    @MaxLength(50, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH})
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE_REGEX})
    readonly double_password: string
}