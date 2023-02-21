import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";
import {UserEntity} from "./user.entity";

@Injectable()
export class UserEvent {
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly mailerService: MailerService,
    ) {
    }
    @OnEvent('registered.user', { async: true })
    async sendEmailRegisterUser(user: UserEntity) {
        return await this.mailerService
            .sendMail({
                to: user.email,
                from: 'sd213dddd@gmail.com',
                subject: 'Подтверждение регистрации',
                template: 'registerUserEmail',
                context: {
                    url: process.env.PRODUCTION_LINK + '/confirm/' + user.hashUser,
                },
            })
            .catch(() => {
                throw new HttpException('Mail sending error', HttpStatus.UNPROCESSABLE_ENTITY);
            });
    }

    @OnEvent('forget.user', { async: true })
    async sendEmailForgetUser(user: UserEntity) {
        await this.mailerService
            .sendMail({
                to: user.email,
                subject: 'Восстановление пароля',
                from: 'sd213dddd@gmail.com',
                template: 'forgetUserEmail',
                context: {
                    url: process.env.PRODUCTION_LINK + '/new_password/' + user.hashUser,
                },
            })
            .catch(() => {
                throw new HttpException('Mail sending error', HttpStatus.UNPROCESSABLE_ENTITY);
            });
    }
}