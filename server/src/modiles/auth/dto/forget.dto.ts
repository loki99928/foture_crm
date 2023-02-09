import {IsEmail, IsNotEmpty} from "class-validator";
import {MESSAGE} from "../auth.utils";
import {ApiProperty} from "@nestjs/swagger";

export class ForgetDTO {
    @IsNotEmpty({message: MESSAGE.EMAIL_RULE_MESSAGE_REQUIRED})
    @IsEmail({},  {message: MESSAGE.EMAIL_RULE_MESSAGE_INCORRECT})
    @ApiProperty({
        type: 'string',
        default: 'loki99928@yandex.ru'
    })
    readonly email: string
}