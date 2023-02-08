import {IsEmail, IsNotEmpty, MaxLength, MinLength, Matches} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {MESSAGE, REGEX} from "../auth/auth.utils";

export class UserDTO {
    @ApiProperty({
        required: false,
        type: 'string'
    })
    @IsNotEmpty({message: MESSAGE.EMAIL_RULE_MESSAGE_REQUIRED})
    @IsEmail({},  {message: MESSAGE.EMAIL_RULE_MESSAGE_INCORRECT})
    readonly email?: string

    @ApiProperty({
        required: false,
        type: 'string'
    })
    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    @MinLength(5, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH})
    @MaxLength(50, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH})
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE_REGEX})
    readonly password?: string

    @ApiProperty({
        required: false,
        type: 'string'
    })
    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    @MinLength(5, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH})
    @MaxLength(50, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH})
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE_REGEX})
    readonly double_password?: string

    @ApiProperty({
        required: false,
        type: 'boolean'
    })
    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    readonly remember?: boolean

    @ApiProperty({
        required: false,
        type: 'string'
    })
    @IsNotEmpty({message: MESSAGE.HASH_RULE_MESSAGE_REQUIRED})
    readonly hashUser?: string
}