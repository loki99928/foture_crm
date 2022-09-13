import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AuthService, IAuthorizeUserResponse, IConfirmUserResponse, IRegisterUserResponse} from "./auth.service";
import {UserRegisterRequestDto} from "./dto/register-user.req.dto";
import {UserAuthorizeDto} from "./dto/authorize-user.dto";
import {UserForgetDto} from "./dto/forget-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Get('/login')
    login(){
        return this.authService.login()
    }

    /**
     * Authorize user
     * @param userData UserAuthorizeDto
     */
    @Post('/authorize')
    authorize(@Body() userData: UserAuthorizeDto): Promise<IAuthorizeUserResponse>{
        return this.authService.authorize(userData)
    }

    /**
     * Register user
     * @param userData UserRegisterRequestDto
     */
    @Post('/register')
    async register(@Body() userData: UserRegisterRequestDto): Promise<IRegisterUserResponse>{
        return this.authService.register(userData)
    }

    @Post('/forget')
    async forget(@Body() UserData: UserForgetDto): Promise<IConfirmUserResponse>{
        return this.authService.forget(UserData)
    }

    /**
     * Confirm user
     * @param id id of user
     */
    @Get('/confirm/:id')
    userConfirmation(@Param('id') id: string){
        return this.authService.userConfirmation(id)
    }

    @Post('/changeTokenNewPassword')
    changeTokenNewPassword(){
        return this.authService.changeTokenNewPassword()
    }

    @Post('/createNewPassword')
    createNewPassword(){
        return this.authService.createNewPassword()
    }
}
