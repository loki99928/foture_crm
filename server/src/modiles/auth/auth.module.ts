import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {AuthController} from './../auth/auth.controller';
import {AuthService} from './../auth/auth.service';
import {UserEntity} from "../user/user.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: {expiresIn: `${process.env.JWT_EXPIRES_IN}`},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
}


