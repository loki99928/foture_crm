import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AuthService, IAuthorizeUserResponse, IResponse} from "./auth.service";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {UserDTO} from "../user/user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    /**
     * Register user
     * @param userData UserRegisterRequestDto
     * @return Promise
     */
    @ApiBody({ type: UserDTO })
    @Post('/register')
    async register(@Body() userData: UserDTO): Promise<IResponse>{
        return this.authService.register(userData)
    }

    /**
     * подтверждение почты пользователя
     * @param hashUser hash of user
     * @return Promise
     */
    @Get('/confirm/:hashUser')
    userConfirmation(@Param('hashUser') hashUser: string): Promise<IResponse>{
        return this.authService.userConfirmation(hashUser)
    }

    /**
     * Authorize user
     * @param userData UserAuthorizeDto
     * @return Promise
     */
    @Post('/authorize')
    authorize(@Body() userData: UserDTO): Promise<IAuthorizeUserResponse>{
        return this.authService.authorize(userData)
    }

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     * @param UserData UserForgetDto
     * @return Promise
     */
    @Post('/forget')
    async forget(@Body() UserData: UserDTO): Promise<IResponse>{
        return this.authService.forget(UserData)
    }

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     * @param hashUser string
     * @return Promise
     */
    @Get('/changeTokenNewPassword/:hashUser')
    changeTokenNewPassword(@Param('hashUser')hashUser: string): Promise<IResponse>{
        return this.authService.changeTokenNewPassword(hashUser)
    }

    /**
     * Создание нового пароля
     * @param UserData NewPasswordUserDto
     * @return Promise
     */
    @Post('/createNewPassword')
    async createNewPassword(@Body() UserData: UserDTO): Promise<IResponse>{
        return this.authService.createNewPassword(UserData)
    }
}
