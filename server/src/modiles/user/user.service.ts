import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {delay} from "../../app.utils";

export interface IJWTUser{
    email: string
    id: number
    remember: boolean
}
export interface IUserResponse{
    userId: number
    email: string
    accessToken: string
    message: string
    remember: boolean
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
     * аутентификация пользователя по токену
     * @param jwt authorize token
     */
    async get(jwt): Promise<IUserResponse>{

        // await delay(1000)
        try {
            const json = this.jwtService.decode(jwt, { json: true }) as IJWTUser;

            if (json === null) throw new HttpException(['Token is not validation'], HttpStatus.BAD_REQUEST);

            console.log(json)

            const expired = Date.now() >= json['exp'] * 1000
            console.log(expired)
            if (expired) {
                throw new HttpException(['Token expired'], HttpStatus.BAD_REQUEST);
            }

            let user = await this.UserRepository.findOneById(json.id)
            console.log(user)
            if (user === null) throw new HttpException(['User is not find'], HttpStatus.BAD_REQUEST);

            const payload = { email: user.email, id: user.id, remember: json.remember };

            return {
                userId: user.id,
                email: user.email,
                remember: json.remember,
                accessToken: this.jwtService.sign(payload, {expiresIn: '1d'}),
                message: 'authorization is validation',
            };

        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }
}
