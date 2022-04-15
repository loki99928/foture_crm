import {Body, Controller, Get, HttpStatus, Post, ValidationPipe} from '@nestjs/common';
import {AuthService, IRegister} from "./auth.service";
import {UserRegisterRequestDto} from "./dto/register-user.req.dto";
import {TemporaryUser} from "./auth.entity";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Get('/login')
    login(){
        return this.authService.login()
    }
    @Post('/authorize')
    authorize(){
        return this.authService.authorize()
    }
    @Post('/register')
    async register(@Body() userData: UserRegisterRequestDto): Promise<IRegister>{
        return this.authService.register(userData)
    }
    @Post('/forget')
    forget(){
        return this.authService.forget()
    }
    @Post('/confirm')
    userConfirmation(){
        return this.authService.userConfirmation()
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
