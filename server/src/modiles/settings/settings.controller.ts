import {Controller, Delete, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

@Controller('/settingsMenu')
@ApiTags('settings')
export class SettingsController {
}
