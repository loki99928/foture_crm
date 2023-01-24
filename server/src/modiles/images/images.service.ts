import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SettingsEntity} from "../settings/settings.entity";
import {ImagesEntity} from "./images.entity";

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(SettingsEntity)
        private readonly SettingsRepository: Repository<SettingsEntity>,
        @InjectRepository(ImagesEntity)
        private readonly ImagesRepository: Repository<ImagesEntity>
    ) {
        this.init()
    }
    async init(){
        const createAvatar = await this.SettingsRepository.findOneBy({option: 'createAvatar'})
        if (createAvatar){
            await this.ImagesRepository.save([{type: 'avatar', url: '/access/images/avatar/avatar_1.jpg'}, {type: 'avatar', url: '/access/images/avatar/avatar_2.jpg'}])
            await this.SettingsRepository.save({option: 'create_avatar', value: 'init'})
        }
    }
}
