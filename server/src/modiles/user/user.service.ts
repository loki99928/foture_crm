import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";

export interface IJWTUser{
    email: string
    id: number
}
export interface IUserResponse{
    userId: number
    email: string
    accessToken: string
    message: string
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private UserRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {
    }

    /**
     * getting user data by token
     * @param jwt authorize token
     */
    async get(jwt): Promise<IUserResponse>{
        try {
            const json = this.jwtService.decode(jwt, { json: true }) as IJWTUser;
            if (json === null) throw new HttpException(['Token is not validation'], HttpStatus.BAD_REQUEST);

            const expired = Date.now() >= json['exp'] * 1000
            if (expired) {
                throw new HttpException(['Token expired'], HttpStatus.BAD_REQUEST);
            }

            let user = await this.UserRepository.findOneById(json.id)
            if (user === null) throw new HttpException(['User is not find'], HttpStatus.BAD_REQUEST);

            const payload = { email: user.email, id: user.id };
            return {
                userId: user.id,
                email: user.email,
                accessToken: this.jwtService.sign(payload),
                message: 'authorization is validation',
            };
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }
}
