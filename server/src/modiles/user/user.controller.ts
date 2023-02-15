import {Controller, Get, Req} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from "./user.service";
import {ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {UserRO} from "./dto/user.ro";
import {MessageRO} from "../auth/dto/authorize.ro";

@Controller('/user')
@ApiTags('user')
@ApiSecurity('JWT-auth')
export class UserController {

    constructor(
        private readonly UserService: UserService
    ) {
    }

    @Get('')
    @ApiBearerAuth()
    @ApiCreatedResponse({type: UserRO})
    @ApiBadRequestResponse({type: MessageRO})
    get(@Req() req: Request){
        return this.UserService.get(req.body.user)
    }
}
