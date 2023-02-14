import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserController} from "./user.controller";
import {UserService} from './user.service';
import {UserEntity} from "./user.entity";
import {ImagesEntity} from "../images/images.entity";
import {AuthMiddleware} from "../../middleware/AuthMiddleware";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: {expiresIn: `${process.env.JWT_EXPIRES_IN}`},
        }),
    ]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthMiddleware)
            .forRoutes('user')
    }
}
