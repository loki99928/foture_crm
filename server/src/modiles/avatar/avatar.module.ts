import { Module } from '@nestjs/common';
import {AvatarController} from "./avatar.controller";
import {AvatarService} from "./avatar.service";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [AvatarController],
    providers: [AvatarService]
})
export class AvatarModule {}
