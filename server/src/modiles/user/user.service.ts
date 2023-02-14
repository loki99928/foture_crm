import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserRO} from "./dto/user.ro";

export interface IJWTUser {
    email: string
    id: number
    remember: boolean
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    /**
     * аутентификация пользователя по токену
     * @param jwt authorize token
     */
    async get(user): Promise<any> {
        // await delay(1000)
        try {
            return user
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }
}
