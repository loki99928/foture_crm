import {IsEmail, IsNotEmpty} from "class-validator";
import {MESSAGE} from "../auth.utils";
import {ApiProperty} from "@nestjs/swagger";

export class ForgetDTO {
    @ApiProperty({
        type: 'string'
    })
    @IsNotEmpty({message: MESSAGE.EMAIL_RULE_MESSAGE_REQUIRED})
    @IsEmail({},  {message: MESSAGE.EMAIL_RULE_MESSAGE_INCORRECT})
    readonly email: string
}