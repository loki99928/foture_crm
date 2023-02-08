import {Controller, Delete, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('settings')
@Controller('/settings')
export class SettingsController {
}
