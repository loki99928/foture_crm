import {Controller, Get, Req} from '@nestjs/common';
import { Request } from 'express';
import {UserService} from "./user.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('user')
@Controller('/user')
export class UserController {

    constructor(
        private readonly UserService: UserService
    ) {
    }

    @Get('')
    get(@Req() request: Request){
        const jwt = request.headers.authorization.replace('Bearer ', '');
        return this.UserService.get(jwt)
    }
}
