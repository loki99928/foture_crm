import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImagesController} from "./images.controller";
import {ImagesService} from "./images.service";
import {SettingsEntity} from "../settings/settings.entity";
import {ImagesEntity} from "./images.entity";
import {SettingsModule} from "../settings/settings.module";

@Module({
    controllers: [ImagesController],
    providers: [ImagesService],
    imports: [
        TypeOrmModule.forFeature([ImagesEntity]),
        SettingsModule
    ]
})
export class ImagesModule {}
