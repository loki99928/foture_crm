import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {NestjsImgResizeModule} from "nestjs-img-resize";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserController} from "./user.controller";
import {UserService} from './user.service';
import {UserEntity} from "./user.entity";
import {AuthMiddleware} from "../../middleware/AuthMiddleware";
import {GlobalConstants} from "../../config/globalConstants";
import {UserEvent} from "./user.event";

@Module({
    providers: [
        UserService,
        GlobalConstants,
        UserEvent
    ],
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: {expiresIn: `${process.env.JWT_EXPIRES_IN}`},
        }),
        NestjsImgResizeModule
    ],
    exports: [TypeOrmModule]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthMiddleware)
            .forRoutes('user')
    }
}
