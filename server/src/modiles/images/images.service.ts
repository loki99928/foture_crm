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
            /**
             * создаем массив изображений
             */
            let arrImages = []
            for (let i = 1; i <= 10; i++){
                arrImages.push({type: 'avatar', url: `/static/images/avatar/avatar_${i}.jpg`})
            }
            /**
             * создаем дефолтные автарки пользователей
             */
            await this.ImagesRepository.save(arrImages)

            /**
             * меняем status что созданы дефолтные автарки пользователей
             */
            await this.SettingsRepository.save({option: 'create_avatar', value: 'init'})
        }
    }

    get(name){

    }
}
