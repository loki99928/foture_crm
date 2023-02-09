import {IsNotEmpty, Matches, MaxLength, MinLength} from "class-validator";
import {MESSAGE, REGEX} from "../auth.utils";
import {ApiProperty} from "@nestjs/swagger";

export class NewPasswordDTO {

    @IsNotEmpty({message: MESSAGE.HASH_RULE_MESSAGE_REQUIRED})
    @ApiProperty({
        type: 'string'
    })
    readonly hashUser: string

    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    @MinLength(5, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH})
    @MaxLength(50, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH})
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE_REGEX})
    @ApiProperty({
        type: 'string'
    })
    readonly password: string

    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    @MinLength(5, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH})
    @MaxLength(50, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH})
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE_REGEX})
    @ApiProperty({
        type: 'string'
    })
    readonly double_password: string
}