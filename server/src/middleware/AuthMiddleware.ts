import {HttpException, HttpStatus, Injectable, NestMiddleware} from "@nestjs/common";
import { Response, Request, NextFunction } from 'express';
import {JwtService} from "@nestjs/jwt";
import {IJWTUser} from "../modiles/user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../modiles/user/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {
    }
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {

        const headerAuth = req.headers['authorization']

        if (!headerAuth) throw new HttpException(['Token is null'], HttpStatus.BAD_REQUEST);

        const jwt = headerAuth.replace('Bearer ', '');
        const json = this.jwtService.decode(jwt, {json: true}) as IJWTUser;

        if (json === null) throw new HttpException(['Token is not validation'], HttpStatus.BAD_REQUEST);

        const expired = Date.now() >= json['exp'] * 1000

        if (expired) {
            throw new HttpException(['Token expired'], HttpStatus.BAD_REQUEST);
        }

        let user = await this.UserRepository.findOne(
            {
                where: {id: json.id},
                relations: ['avatar'],
            }
        )

        if (user === null) throw new HttpException(['User is not find'], HttpStatus.BAD_REQUEST);

        req.body.user = user.toResponseObject();

        next()
    }
}