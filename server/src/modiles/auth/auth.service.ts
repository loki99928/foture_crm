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

@Injectable()
export class AuthService {

    private readonly logger = new MyLogger();

    // number of password recovery attempts
    private attempts
    // max number of password recovery attempts
    private maxAttempts = 15
    // max time change
    private readonly maxTimeHasGone = 1
    // private readonly maxTimeHasGone = 15

    constructor(
        @InjectRepository(UserEntity)
        private UserRepository: Repository<UserEntity>,
        private readonly mailerService: MailerService,
        private jwtService: JwtService
    ) {
    }

    login() {
        return 'this.authService.login()'
    }

    /**
     * Registration user
     *
     * @param dto UserRegisterRequestDto
     * @return Promise<IRegisterUserResponse>
     */
    async register(dto: UserRegisterRequestDto): Promise<IRegisterUserResponse> {
        try {
            // verification of the user's confirmed email
            let confirmUser = await this.UserRepository.findOneBy({email: dto.email, confirm: true})
            if (confirmUser){
                throw new HttpException(['Email busy'], HttpStatus.BAD_REQUEST);
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
     * confirmation email of user
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
     * authorize user
     *
     * @param dto UserAuthorizeDto
     */
    async authorize(dto: UserAuthorizeDto): Promise<IAuthorizeUserResponse> {

        try {
            const currentUser = await this.UserRepository.findOneBy({'email': dto.email, confirm: true})
            if (currentUser === null){
                throw new HttpException(['Email or password is incorrect'], HttpStatus.BAD_REQUEST);
            }

            const isValidPassword = bcrypt.compareSync(dto.password, currentUser.password)
            if (!isValidPassword) {
                throw new HttpException(['Email or password is incorrect'], HttpStatus.BAD_REQUEST);
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
     * user password recovery
     *
     * @param dto UserForgetDto
     */
    async forget(dto: UserForgetDto): Promise<IConfirmUserResponse> {
        try {
            let currentUser = await this.UserRepository.findOneBy({email: dto.email})

            if (!currentUser) throw new HttpException(['User is not find'], HttpStatus.BAD_REQUEST);

            console.log('timeHasGone ->', currentUser)

            let lastModifiedTime
            let lastModifiedTimeBD = currentUser.lastModifiedTime

            console.log(lastModifiedTimeBD)

            if (!lastModifiedTimeBD){ // если нет времени первого запроса на восстановления пароля
                lastModifiedTime = new Date()
            } else { // если есть берем из бд
                lastModifiedTime = lastModifiedTimeBD.getTime()
            }

            let timeHasGone = (Date.now() - currentUser.lastModifiedTime.getTime()) / 1000 / 60

            this.attempts = currentUser.attemptsNumber + 1

            if (currentUser.attemptsNumber >= this.maxAttempts && Math.ceil(timeHasGone) > this.maxTimeHasGone) { // если количество попыток запросов на восстановление пароля превысило мак допустимое за промежуток времени lastModifiedTime
                throw new HttpException([`The number of password recovery attempts has been exceeded. try again in ${15 - Math.ceil(timeHasGone)} minutes`], HttpStatus.BAD_REQUEST);
            } else if (currentUser.attemptsNumber >= this.maxAttempts && Math.ceil(timeHasGone) >= this.maxTimeHasGone) { // если прошло время ограничения по времени
                lastModifiedTime = new Date()
                this.attempts = 0
            }

            let hashUser = getAlphaNumericRandom(20)

            let newUser = await this.UserRepository.update(currentUser.id, {attemptsNumber: this.attempts, lastModifiedTime, hashUser})

            currentUser.hashUser = hashUser
            await this.sendMailForgetUser(currentUser)

            return {
                message: ['Message sent to your email']
            }
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }


    changeTokenNewPassword() {
        return 'this.authService.changeTokenNewPassword()'
    }

    createNewPassword() {
        return 'this.authService.createNewPassword()'
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
            .catch((e) => {
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
            .catch((e) => {
                throw new HttpException({message: ['Mail sending error']}, HttpStatus.UNPROCESSABLE_ENTITY);
            });
    }
}
