import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {MailerService} from "@nestjs-modules/mailer";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";
import {UserRegisterRequestDto} from './dto/register-user.req.dto'
import {UserAuthorizeDto} from "./dto/authorize-user.dto";
import {UserForgetDto} from "./dto/forget-user.dto";
import {MyLogger} from "../../common/Logger";
import {UserEntity} from "../user/user.entity";
import {NewPasswordUserDto} from "./dto/newPassword-user.dto";

export interface IRegisterUserResponse {
    message: string[]
}
export interface IAuthorizeUserResponse {
    userId: number
    accessToken: string
    message: string[]
    remember: boolean
}
export interface IConfirmUserResponse {
    message: string[]
}
export interface ICreateNewPasswordResponse {
    message: string[]
}
@Injectable()
export class AuthService {

    private readonly logger = new MyLogger(AuthService.name);

    // number of password recovery attempts
    private attempts
    // max number of password recovery attempts
    private maxAttempts = 3
    // max time change
    private readonly maxTimeHasGone = 15

    private sendErrorCode(text: string): Error{
        throw new HttpException([text], HttpStatus.BAD_REQUEST);
    }

    constructor(
        @InjectRepository(UserEntity)
        private UserRepository: Repository<UserEntity>,
        private readonly mailerService: MailerService,
        private jwtService: JwtService
    ) {
    }

    /**
     * регистрация пользователя
     *
     * @param dto UserRegisterRequestDto
     * @return Promise<IRegisterUserResponse>
     */
    async register(dto: UserRegisterRequestDto): Promise<IRegisterUserResponse> {
        try {
            // verification of the user's confirmed email
            let confirmUser = await this.UserRepository.findOneBy({email: dto.email, confirm: true})
            if (confirmUser){
                this.sendErrorCode('Email busy')
            }

            // verification of unconfirmed user email
            let User = await this.UserRepository.findOneBy({email: dto.email, confirm: false})
            if (!User){
                // todo-dv почему нельзя использовать схему сохранения this.TemporaryUserRepository.save? не работают @BeforeInsert()
                const user = new UserEntity()
                user.email = dto.email
                user.password = dto.password
                User = await user.save()
            }
            await this.sendMailRegisterUser(User)
            return {
                message: ['User created. Your email confirmation is required!']
            }
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * подтверждение почты пользователя
     *
     * @param hashUser
     * @return Promise<{ message: string }>
     */
    async userConfirmation(hashUser): Promise<{ message: string[] }> {
        return this.UserRepository.findOneBy({hashUser, confirm: false})
            .then(async (user) => {
                if (user){
                    await this.UserRepository.update(user.id, {confirm: true})
                    return {
                        message: ['Your email has been verified']
                    }
                } else {
                    throw new HttpException({message:['User is not find']}, HttpStatus.BAD_REQUEST);
                }
            })
    }

    /**
     * авторизация пользователя
     *
     * @param dto UserAuthorizeDto
     */
    async authorize(dto: UserAuthorizeDto): Promise<IAuthorizeUserResponse> {

        try {
            const currentUser = await this.UserRepository.findOneBy({'email': dto.email, confirm: true})
            if (currentUser === null){
                this.sendErrorCode('Email or password is incorrect')
            }

            const isValidPassword = bcrypt.compareSync(dto.password, currentUser.password)
            if (!isValidPassword) {
                this.sendErrorCode('Email or password is incorrect')
            }

            const payload = { email: currentUser.email, id: currentUser.id, remember: dto.remember };

            return {
                userId: currentUser.id,
                accessToken: this.jwtService.sign(payload),
                remember: dto.remember,
                message: ['authorization was successful'],
            };

        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * запрос на восстановление пароля
     *
     * @param dto UserForgetDto
     */
    async forget(dto: UserForgetDto): Promise<IConfirmUserResponse> {
        try {
            let currentUser = await this.UserRepository.findOneBy({email: dto.email})

            if (!currentUser) this.sendErrorCode('User is not find')

            let lastModifiedTime = currentUser.lastModifiedTime ?? new Date

            let timeHasGone = (Date.now() - lastModifiedTime.getTime()) / 1000 / 60

            this.attempts = currentUser.attemptsNumber + 1

            if (currentUser.attemptsNumber >= this.maxAttempts && Math.ceil(timeHasGone) <= this.maxTimeHasGone) { // если количество попыток запросов на восстановление пароля превысило мак допустимое за промежуток времени lastModifiedTime
                this.sendErrorCode(`The number of password recovery attempts has been exceeded. try again in ${this.maxTimeHasGone - Math.ceil(timeHasGone)} minutes`)
            } else if (currentUser.attemptsNumber <= this.maxAttempts && Math.ceil(timeHasGone) >= this.maxTimeHasGone) { // если прошло время ограничения по времени
                lastModifiedTime = new Date
                this.attempts = 0
            }

            let hashUser = getAlphaNumericRandom(20)

            await this.UserRepository.update(currentUser.id, {attemptsNumber: this.attempts, lastModifiedTime, hashUser})

            currentUser.hashUser = hashUser
            await this.sendMailForgetUser(currentUser)

            return {
                message: ['Message sent to your email']
            }
        } catch (e) {
            this.logger.debug(e.response)
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * проверка временного токена из ссылки на восстановление пароля
     *
     * @param hashUser string
     */
    async changeTokenNewPassword(hashUser: string) {
        try {
            // const user = await this.UserRepository.findOneBy({hashUser, confirm: true})
            //
            // if (!user) this.sendErrorCode('Token is not valid') // если не нашли пользователя по хешу

            // let lastModifiedTime = user.lastModifiedTime;
            // let timeHasGone = (Date.now() - lastModifiedTime.getTime()) / 1000 / 60
            // if (Math.ceil(timeHasGone) > this.maxTimeHasGone) this.sendErrorCode('Token expired') // если закончилось время жизни токена

            return {
                message: ['Token is valid']
            }

        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Создание нового пароля
     * @param dto NewPasswordUserDto
     */
    async createNewPassword(dto: NewPasswordUserDto) {
        console.log(dto)
        try {
            const arrUser = await this.UserRepository.findOneBy({hashUser: dto.hashUser, confirm: true})

            if (!arrUser) this.sendErrorCode('Token is not valid') // если не нашли пользователя по хешу

            this.logger.debug(arrUser)
            // const user = new UserEntity()
            // user.email = arrUser.email
            // user.password = dto.password
            // User = await user.save()
            // await this.UserRepository.update(arrUser.id, {hashUser: '', lastModifiedTime: null, attemptsNumber: 0, password: dto.password})
            await this.UserRepository.update(arrUser.id, { password: dto.password})
            return {
                message: ['Token is valid']
            }

        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }












    // todo-dv нужно перенести отправку почты в отдельный файл
    async sendMailForgetUser(user: UserRegisterRequestDto) {
        return await this.mailerService
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
                throw new HttpException({message: ['Mail sending error']}, HttpStatus.UNPROCESSABLE_ENTITY);
            });
    }

    // todo-dv нужно перенести отправку почты в отдельный файл
    async sendMailRegisterUser(user: UserRegisterRequestDto) {
        return await this.mailerService
            .sendMail({
                to: user.email,
                subject: 'Подтверждение регистрации',
                from: 'sd213dddd@gmail.com',
                template: 'registerUserEmail',
                context: {
                    url: process.env.PRODUCTION_LINK + '/confirm/' + user.hashUser,
                },
            })
            .catch(() => {
                throw new HttpException({message: ['Mail sending error']}, HttpStatus.UNPROCESSABLE_ENTITY);
            });
    }
}
