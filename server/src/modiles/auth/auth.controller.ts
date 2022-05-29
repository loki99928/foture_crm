import {Body, Controller, Get, HttpStatus, Param, Post, ValidationPipe} from '@nestjs/common';
import {AuthService, IRegister} from "./auth.service";
import {UserRegisterRequestDto} from "./dto/register-user.req.dto";
import {TemporaryUserEntity} from "./auth.entity";
import {UserAuthorizeDto} from "./dto/authorize-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Get('/login')
    login(){
        return this.authService.login()
    }
    @Post('/authorize')
    authorize(@Body() userData: UserAuthorizeDto){
        return this.authService.authorize(userData)
    }
    @Post('/register')
    async register(@Body() userData: UserRegisterRequestDto): Promise<IRegister>{
        return this.authService.register(userData)
    }
    @Post('/forget')
    forget(){
        return this.authService.forget()
    }
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
