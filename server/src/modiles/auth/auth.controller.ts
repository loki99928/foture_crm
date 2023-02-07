import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AuthService, IAuthorizeUserResponse, IResponse} from "./auth.service";
import {UserRegisterRequestDTO} from "./dto/register-user.req.dto";
import {UserAuthorizeDTO} from "./dto/authorize-user.dto";
import {UserForgetDTO} from "./dto/forget-user.dto";
import {NewPasswordUserDTO} from "./dto/new-password-user-d-t.o";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    /**
     * Register user
     * @param userData UserRegisterRequestDto
     * @return Promise
     */
    @Post('/register')
    async register(@Body() userData: UserRegisterRequestDTO): Promise<IResponse>{
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
    authorize(@Body() userData: UserAuthorizeDTO): Promise<IAuthorizeUserResponse>{
        return this.authService.authorize(userData)
    }

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     * @param UserData UserForgetDto
     * @return Promise
     */
    @Post('/forget')
    async forget(@Body() UserData: UserForgetDTO): Promise<IResponse>{
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
    async createNewPassword(@Body() UserData: NewPasswordUserDTO): Promise<IResponse>{
        return this.authService.createNewPassword(UserData)
    }
}
