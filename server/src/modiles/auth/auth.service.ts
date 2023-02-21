import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {MailerService} from "@nestjs-modules/mailer";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {EventEmitter2} from "@nestjs/event-emitter";

import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";
import {MyLogger} from "../../common/Logger";
import {UserEntity, UserRole} from "../user/user.entity";
import {ImagesEntity} from "../images/images.entity";
import {RegisterDTO} from "./dto/register.dto";
import {AuthorizeDTO} from "./dto/authorize.dto";
import {ForgetDTO} from "./dto/forget.dto";
import {NewPasswordDTO} from "./dto/newPassword.dto";
import {MessageRO} from "./dto/authorize.ro";
import {UserRO} from "../user/dto/user.ro";

@Injectable()
export class AuthService {

    private readonly logger = new MyLogger(AuthService.name);

    // number of password recovery attempts
    private attempts
    // max number of password recovery attempts
    private maxAttempts = 3
    // max time change
    private readonly maxTimeHasGone = 15

    private sendErrorCode(text: string, code: HttpStatus = HttpStatus.BAD_REQUEST): Error {
        throw new HttpException([text], code);
    }

    constructor(
        @InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>,
        @InjectRepository(ImagesEntity) private ImageRepository: Repository<ImagesEntity>,
        private readonly eventEmitter: EventEmitter2,
        private readonly mailerService: MailerService,
        private jwtService: JwtService,
    ) {
    }

    /**
     * регистрация пользователя
     *
     * @param data UserRegisterRequestDto
     * @return Promise<MessageRO>
     */
    async register(data: RegisterDTO): Promise<MessageRO> {
        try {
            // verification of the user's confirmed email
            let confirmUser = await this.UserRepository.findOneBy({email: data.email, confirm: true})
            if (confirmUser) {
                this.sendErrorCode('Email busy')
            }

            // verification of unconfirmed user email
            let User = await this.UserRepository.findOneBy({email: data.email, confirm: false})
            if (!User) {
                const image = await this.ImageRepository.findOne({
                    where: {
                        id: Math.ceil((Math.random() * 10))
                    }
                });

                let arrUser = {
                    email: data.email,
                    password: data.password
                } as UserEntity

                /**
                 * check for the presence of a superadmin, if not, then create the first user with super rights
                 */
                const isSuperAdmin = await this.UserRepository.findOneBy({role: UserRole.SUPERADMIN})
                if (!isSuperAdmin) {
                    arrUser.role = UserRole.SUPERADMIN
                }

                const user = this.UserRepository.create(arrUser);
                user.avatar = image;
                await this.UserRepository.save(user);
            }

            this.eventEmitter.emit('registered.user', User);

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
     * @return Promise<MessageRO>
     */
    async userConfirmation(hashUser): Promise<MessageRO> {
        const user = await this.UserRepository.findOneBy({hashUser, confirm: false})
        if (user) {
            await this.UserRepository.update(user.id, {confirm: true})
            return {
                message: ['Your email has been verified']
            }
        } else {
            throw new HttpException({message: ['User is not find']}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * авторизация пользователя
     *
     * @param data UserAuthorizeDto
     * @return Promise<ResponseUser>
     */
    async authorize(data: AuthorizeDTO): Promise<UserRO> {
        try {
            let currentUser = await this.UserRepository.findOne(
                {
                    where: {'email': data.email, confirm: true},
                    relations: ['avatar']
                }
            )
            if (currentUser === null) {
                this.sendErrorCode('Email or password is incorrect')
            }
            const isValidPassword = bcrypt.compareSync(data.password, currentUser.password)

            if (!isValidPassword) {
                this.sendErrorCode('Email or password is incorrect')
            }
            const payload = {email: currentUser.email, id: currentUser.id};
            const accessToken = this.jwtService.sign(payload, {expiresIn: '1d'})
            return {
                ...currentUser.toResponseObject(),
                accessToken
            };

        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * запрос на восстановление пароля
     *
     * @param data UserForgetDto
     * @return Promise<MessageRO>
     */
    async forget(data: ForgetDTO): Promise<MessageRO> {
        try {
            let currentUser = await this.UserRepository.findOneBy({email: data.email})

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

            await this.UserRepository.update(currentUser.id, {
                attemptsNumber: this.attempts,
                lastModifiedTime,
                hashUser
            })

            currentUser.hashUser = hashUser

            this.eventEmitter.emit('forget.user', currentUser);

            return {
                message: ['Message sent to your email']
            }
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * проверка временного токена из ссылки на восстановление пароля
     *
     * @param hashUser string
     * @return Promise<IResponse>
     */
    async changeTokenNewPassword(hashUser: string): Promise<MessageRO> {
        try {
            const user = await this.UserRepository.findOneBy({hashUser, confirm: true})
            if (!user) this.sendErrorCode('Token is not valid') // если не нашли пользователя по хешу
            let lastModifiedTime = user.lastModifiedTime;
            let timeHasGone = (Date.now() - lastModifiedTime.getTime()) / 1000 / 60
            if (Math.ceil(timeHasGone) > this.maxTimeHasGone) this.sendErrorCode('Token expired') // если закончилось время жизни токена
            return {
                message: ['Token is valid']
            }
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Создание нового пароля
     * @param data NewPasswordUserDto
     * @return Promise<IResponse>
     */
    async createNewPassword(data: NewPasswordDTO): Promise<MessageRO> {
        try {
            let arrUser = await this.UserRepository.findOneBy({hashUser: data.hashUser, confirm: true})
            if (!arrUser) this.sendErrorCode('Token is not valid') // если не нашли пользователя по хешу

            // todo-dv нужно разобраться как обновлять данные
            const user = new UserEntity()
            let hasPas = await user.hashPassword(data.password)
            await this.UserRepository.update(arrUser.id, {
                hashUser: '',
                lastModifiedTime: null,
                attemptsNumber: 0,
                password: hasPas
            })
            return {
                message: ['Password saved']
            }
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }
}
