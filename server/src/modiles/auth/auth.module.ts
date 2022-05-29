import { Module } from '@nestjs/common';
import { AuthController } from './../auth/auth.controller';
import { AuthService } from './../auth/auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TemporaryUserEntity} from "./auth.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TemporaryUserEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

