import {IsEmail, IsNotEmpty} from "class-validator";
import {MESSAGE} from "../auth.utils";

export class UserForgetDto {
    @IsNotEmpty({message: MESSAGE.EMAIL_RULE_MESSAGE_REQUIRED})
    @IsEmail({},  {message: MESSAGE.EMAIL_RULE_MESSAGE_INCORRECT})
    readonly email: string
}