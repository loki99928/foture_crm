import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImagesController} from "./images.controller";
import {ImagesService} from "./images.service";
import {SettingsEntity} from "../settings/settings.entity";
import {ImagesEntity} from "./images.entity";

@Module({
    controllers: [ImagesController],
    providers: [ImagesService],
    imports: [
        TypeOrmModule.forFeature([SettingsEntity, ImagesEntity])
    ]
})
export class ImagesModule {}
