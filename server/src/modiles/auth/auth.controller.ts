import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {
    AuthService,
    IAuthorizeUserResponse,
    IConfirmUserResponse,
    ICreateNewPasswordResponse,
    IRegisterUserResponse
} from "./auth.service";
import {UserRegisterRequestDto} from "./dto/register-user.req.dto";
import {UserAuthorizeDto} from "./dto/authorize-user.dto";
import {UserForgetDto} from "./dto/forget-user.dto";
import {NewPasswordUserDto} from "./dto/newPassword-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    /**
     * Authorize user
     * @param userData UserAuthorizeDto
     * @return Promise
     */
    @Post('/authorize')
    authorize(@Body() userData: UserAuthorizeDto): Promise<IAuthorizeUserResponse>{
        return this.authService.authorize(userData)
    }

    /**
     * Register user
     * @param userData UserRegisterRequestDto
     * @return Promise
     */
    @Post('/register')
    async register(@Body() userData: UserRegisterRequestDto): Promise<IRegisterUserResponse>{
        return this.authService.register(userData)
    }

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     * @param string hashUser
     * @return Promise
     */
    @Post('/forget')
    async forget(@Body() UserData: UserForgetDto): Promise<IConfirmUserResponse>{
        return this.authService.forget(UserData)
    }

    /**
     * подтверждение почты пользователя
     * @param hashUser hash of user
     * @return Promise
     */
    @Get('/confirm/:hashUser')
    userConfirmation(@Param('hashUser') hashUser: string){
        return this.authService.userConfirmation(hashUser)
    }

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     * @param string hashUser
     * @return Promise
     */
    @Get('/changeTokenNewPassword/:hashUser')
    changeTokenNewPassword(@Param('hashUser')hashUser: string){
        return this.authService.changeTokenNewPassword(hashUser)
    }

    /**
     * Создание нового пароля
     * @param userData NewPasswordUserDto
     * @return Promise
     */
    @Post('/createNewPassword')
    async createNewPassword(@Body() UserData: NewPasswordUserDto): Promise<ICreateNewPasswordResponse>{
        return this.authService.createNewPassword(UserData)
    }
}
