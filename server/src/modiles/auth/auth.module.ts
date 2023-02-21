import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from './../auth/auth.controller';
import {AuthService} from './../auth/auth.service';
import {UserEntity} from "../user/user.entity";
import {ImagesEntity} from "../images/images.entity";
import {UserEvent} from "../user/user.event";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, ImagesEntity]),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: {expiresIn: `${process.env.JWT_EXPIRES_IN}`},
        })
    ],
    exports: [AuthService],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
}


