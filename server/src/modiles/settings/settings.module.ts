import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SettingsEntity} from "./settings.entity";
import {ImagesEntity} from "../images/images.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingsEntity])
  ],
  exports: [TypeOrmModule],
  providers: [SettingsService],
  controllers: [SettingsController]
})
export class SettingsModule {}
