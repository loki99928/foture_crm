import {IsEmail, IsNotEmpty, Matches, MaxLength, MinLength} from 'class-validator';
import {MESSAGE, REGEX} from "../auth.utils";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterDTO {
    @IsNotEmpty({message: MESSAGE.EMAIL_RULE_MESSAGE_REQUIRED})
    @IsEmail({},  {message: MESSAGE.EMAIL_RULE_MESSAGE_INCORRECT})
    @ApiProperty({
        type: 'string',
        default: 'loki99928@yandex.ru'
    })
    readonly email: string

    @IsNotEmpty({message: MESSAGE.PASSWORD_RULE_MESSAGE_REQUIRED})
    @MinLength(5, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MIN_LENGTH})
    @MaxLength(50, {message: MESSAGE.PASSWORD_RULE_MESSAGE_MAX_LENGTH})
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE_REGEX})
    @ApiProperty({
        type: 'string',
        default: '123Qw@'
    })
    readonly password: string
}