import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserController} from "./user.controller";
import {UserService} from './user.service';
import {UserEntity} from "./user.entity";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: {expiresIn: `${process.env.JWT_EXPIRES_IN}`},
        }),
    ]
})
export class UserModule {}
