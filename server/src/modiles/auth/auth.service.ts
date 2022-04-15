import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {UserRegisterRequestDto} from './dto/register-user.req.dto'
import {TemporaryUser} from "./auth.entity";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";
import {MailException} from "../../exception/mail.exception";

export interface IRegister {
    status: HttpStatus,
    user: TemporaryUser
}

@Injectable()
export class AuthService {
    private readonly error: { [key:string]: { error: string; status: HttpStatus } };

    constructor(private readonly mailerService: MailerService) {
        this.error = {
            QueryFailedError: {
                status: HttpStatus.BAD_REQUEST,
                error: 'User creation error'
            },
            MailException: {
                status: HttpStatus.FORBIDDEN,
                error: 'Mail sending error'
            }
        }
    }

    login() {
        return 'this.authService.login()'
    }

    async authorize() {

        throw new BadRequestException('Errors email');
    }

    async register(dto: UserRegisterRequestDto): Promise<IRegister> {
        try {
            const temporaryUser = new TemporaryUser()
            temporaryUser.email = dto.email
            temporaryUser.password = dto.password
            temporaryUser.hashUser = getAlphaNumericRandom(20)
            await temporaryUser.save()
            await this.sendMailRegisterUser(temporaryUser)
            return {
                status: HttpStatus.CREATED,
                user: temporaryUser
            }
        } catch (e) {
            throw new HttpException(this.error[e.name], HttpStatus.BAD_REQUEST);
        }
    }

    forget() {
        return 'this.authService.forget()'
    }

    userConfirmation() {
        return 'this.authService.userConfirmation()'
    }

    changeTokenNewPassword() {
        return 'this.authService.changeTokenNewPassword()'
    }

    createNewPassword() {
        return 'this.authService.createNewPassword()'
    }

    async sendMailRegisterUser(temporaryUser: UserRegisterRequestDto) {
        return await this.mailerService
            .sendMail({
                to: temporaryUser.email,
                subject: 'Подтверждение регистрации',
                template: 'registerUser',
                context: {
                    url: process.env.PRODUCTION_LINK + '/confirm/' + temporaryUser.hashUser,
                },
            })
            .catch((e) => {
                throw new MailException();
            });
    }
}
