import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserRO} from "./dto/user.ro";
import {ImgResizeService} from "nestjs-img-resize";
import {join} from "path";
import * as fs from "fs";

export interface IJWTUser {
    email: string
    id: number
    remember: boolean
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>,
        protected imgResizeService: ImgResizeService,
        private jwtService: JwtService
    ) {
    }

    /**
     * аутентификация пользователя по токену
     * @param jwt authorize token
     */
    async get(user): Promise<UserRO> {
        try {
            const payload = {email: user.email, id: user.id};
            const accessToken = this.jwtService.sign(payload, {expiresIn: '1d'})

            let resizeConfig = {
                width: 100,
                height: 100
            }

            // let urlImage = join(global.homeDirectory, user.avatarUrl)
            // const stream = fs.createReadStream(urlImage)
            // let that = this
            // stream.on('data', async function (chunk) {
            //
            //     let img = new Buffer(chunk.toString(), 'base64');
            //     let imgResize = await that.imgResizeService.resize(img, resizeConfig)
            // });
            return {
                ...user,
                accessToken
            };
        } catch (e) {
            throw new HttpException({message: e.response}, HttpStatus.BAD_REQUEST);
        }
    }
}
