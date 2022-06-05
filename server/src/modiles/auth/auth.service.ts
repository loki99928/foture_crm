import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {MailerService} from "@nestjs-modules/mailer";
import {UserRegisterRequestDto} from './dto/register-user.req.dto'
import {MyLogger} from "../../common/Logger";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../user/user.entity";
import {UserAuthorizeDto} from "./dto/authorize-user.dto";

export interface IRegisterUserResponse {
    message: string[]
}
export interface IAuthorizeUserResponse {
    userId: number
    accessToken: string
    message: string[]
}

@Injectable()
export class AuthService {

    private readonly logger = new MyLogger();

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

    async authorize(dto: UserAuthorizeDto): Promise<IAuthorizeUserResponse> {
        try {
            const currentUser = await this.UserRepository.findOneBy({'email': dto.email})
            if (currentUser === null){
                throw new HttpException({message: 'Email or password is incorrect'}, HttpStatus.BAD_REQUEST);
            }

            const isValidPassword = bcrypt.compareSync(dto.password, currentUser.password)
            if (!isValidPassword) {
                throw new HttpException(['Email or password is incorrect'], HttpStatus.BAD_REQUEST);
            }

            const payload = { email: currentUser.email, id: currentUser.id };
            // todo-dv need to make the refresh_token
            return {
                userId: currentUser.id,
                accessToken: this.jwtService.sign(payload),
                message: ['authorization was successful'],
            };

        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
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
            let notConfirmUser = await this.UserRepository.findOneBy({email: dto.email, confirm: false})
            if (notConfirmUser){
                await this.sendMailRegisterUser(notConfirmUser)
            } else {
                // todo-dv почему нельзя использовать схему сохранения this.TemporaryUserRepository.save не работают @BeforeInsert()
                const user = new UserEntity()
                user.email = dto.email
                user.password = dto.password
                let newUser = await user.save()
                await this.sendMailRegisterUser(newUser)
            }
            return {
                message: ['User created']
            }
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }

    forget() {
        return 'this.authService.forget()'
    }

    /**
     * confirmation email of user
     *
     * @param hashUser
     * @return Promise<{ message: string }>
     */
    async userConfirmation(hashUser): Promise<{ message: string }> {
        return this.UserRepository.findOneBy({hashUser, confirm: false})
            .then(async (user) => {
                if (user){
                    await this.UserRepository.update(user.id, {confirm: true})
                    return {
                        message: 'Your email has been verified'
                    }
                } else {
                    throw new HttpException({message:['User is not find']}, HttpStatus.BAD_REQUEST);
                }
            })
    }

    changeTokenNewPassword() {
        return 'this.authService.changeTokenNewPassword()'
    }

    createNewPassword() {
        return 'this.authService.createNewPassword()'
    }

    // todo-dv нужно перенести отправку почты в отдельный файл
    async sendMailRegisterUser(temporaryUser: UserRegisterRequestDto) {
        return await this.mailerService
            .sendMail({
                to: temporaryUser.email,
                subject: 'Подтверждение регистрации',
                from: 'sd213dddd@gmail.com',
                template: 'registerUserEmail',
                context: {
                    url: process.env.PRODUCTION_LINK + '/confirm/' + temporaryUser.hashUser,
                },
            })
            .catch((e) => {
                throw new HttpException({message: ['Mail sending error']}, HttpStatus.UNPROCESSABLE_ENTITY);
            });
    }
}
