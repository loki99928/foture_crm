import {Module} from '@nestjs/common';
import {AuthController} from './../auth/auth.controller';
import {AuthService} from './../auth/auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: 'jwtConstants.secret',
            signOptions: {expiresIn: '60m'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
}

