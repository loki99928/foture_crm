import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserRegisterRequestDto} from './dto/register-user.req.dto'
import {TemporaryUserEntity} from "./auth.entity";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";
import {MyLogger} from "../../common/Logger";
import {MailerService} from "@nestjs-modules/mailer";
import {MailException} from "../../exception/mail.exception";
import {BeforeInsert, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {error} from "../../common/ListError";
import {UserAuthorizeDto} from "./dto/authorize-user.dto";

export interface IRegister {
    status: HttpStatus,
    user: TemporaryUserEntity
}

@Injectable()
export class AuthService {

    private readonly logger = new MyLogger();

    constructor(
        @InjectRepository(TemporaryUserEntity)
        private TemporaryUserRepository: Repository<TemporaryUserEntity>,
        @InjectRepository(User)
        private UserRepository: Repository<User>,
        private readonly mailerService: MailerService,
    ) {
    }

    login() {
        return 'this.authService.login()'
    }

    async authorize(user: UserAuthorizeDto) {
        let currentUser = this.UserRepository.findOneBy({'email': user.email})
        // throw new BadRequestException('Errors email');
    }

    /**
     * Registration user
     *
     * @param dto UserRegisterRequestDto
     * @return Promise<IRegister>
     */
    async register(dto: UserRegisterRequestDto): Promise<IRegister> {
        try {
            // todo-dv почему нельзя использовать схему сохранения this.TemporaryUserRepository.save не работают @BeforeInsert()
            const temporaryUser = new TemporaryUserEntity()
            temporaryUser.email = dto.email
            temporaryUser.password = dto.password
            let newUser = await temporaryUser.save()
            await this.sendMailRegisterUser(newUser)
            return {
                status: HttpStatus.CREATED,
                user: temporaryUser
            }
        } catch (e) {
            this.logger.debug(error[e.name])
            throw new HttpException(error[e.name], HttpStatus.BAD_REQUEST);
        }
    }

    forget() {
        return 'this.authService.forget()'
    }

    async userConfirmation(hashUser) {
        this.TemporaryUserRepository.findOneBy({'hashUser': hashUser})
            .then(async (temporaryUser) => {
                // todo-dv почему нельзя использовать схему сохранения this.user.save не работают @BeforeInsert()
                const user = new User()
                user.email = temporaryUser.email
                user.password = temporaryUser.password
                let newUser = await user.save()
                await this.TemporaryUserRepository.delete({'email': user.email})
            })
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
                template: 'registerUserEmail',
                context: {
                    url: process.env.PRODUCTION_LINK + '/confirm/' + temporaryUser.hashUser,
                },
            })
            .catch((e) => {
                throw new MailException();
            });
    }
}
