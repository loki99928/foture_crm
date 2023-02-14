import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiQuery, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {AuthorizeDTO} from "./dto/authorize.dto";
import {ForgetDTO} from "./dto/forget.dto";
import {NewPasswordDTO} from "./dto/newPassword.dto";
import {RegisterDTO} from "./dto/register.dto";
import {MessageRO} from "./dto/authorize.ro";
import {UserRO} from "../user/dto/user.ro";

@Controller('auth')
@ApiTags('auth')
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
    @ApiQuery({type: RegisterDTO})
    @ApiCreatedResponse({type: MessageRO})
    @ApiBadRequestResponse({type: MessageRO})
    async register(@Body() userData: RegisterDTO): Promise<MessageRO> {
        return this.authService.register(userData)
    }

    /**
     * подтверждение почты пользователя
     * @param hashUser hash of user
     * @return Promise
     */
    @Get('/confirm/:hashUser')
    @ApiCreatedResponse({type: MessageRO})
    @ApiBadRequestResponse({type: MessageRO})
    userConfirmation(@Param('hashUser') hashUser: string): Promise<MessageRO> {
        return this.authService.userConfirmation(hashUser)
    }

    /**
     * Authorize user
     * @param userData UserAuthorizeDto
     * @return Promise
     */
    @Post('/authorize')
    @ApiQuery({type: AuthorizeDTO})
    @ApiCreatedResponse({type: UserRO})
    @ApiBadRequestResponse({type: MessageRO})
    authorize(@Body() userData: AuthorizeDTO): Promise<UserRO> {
        return this.authService.authorize(userData)
    }

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     * @param UserData UserForgetDto
     * @return Promise
     */
    @Post('/forget')
    @ApiQuery({type: ForgetDTO})
    @ApiCreatedResponse({type: MessageRO})
    @ApiBadRequestResponse({type: MessageRO})
    async forget(@Body() UserData: ForgetDTO): Promise<MessageRO> {
        return this.authService.forget(UserData)
    }

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     * @param hashUser string
     * @return Promise
     */
    @Get('/changeTokenNewPassword/:hashUser')
    @ApiCreatedResponse({type: MessageRO})
    @ApiBadRequestResponse({type: MessageRO})
    changeTokenNewPassword(@Param('hashUser') hashUser: string): Promise<MessageRO> {
        return this.authService.changeTokenNewPassword(hashUser)
    }

    /**
     * Создание нового пароля
     * @param UserData NewPasswordUserDto
     * @return Promise
     */
    @Post('/createNewPassword')
    @ApiQuery({type: NewPasswordDTO})
    @ApiCreatedResponse({type: MessageRO})
    @ApiBadRequestResponse({type: MessageRO})
    async createNewPassword(@Body() UserData: NewPasswordDTO): Promise<MessageRO> {
        return this.authService.createNewPassword(UserData)
    }
}
