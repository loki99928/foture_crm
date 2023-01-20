import { Module } from '@nestjs/common';
import {ImagesController} from "./images.controller";
import {ImagesService} from "./images.service";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [ImagesController],
    providers: [ImagesService]
})
export class ImagesModule {}
