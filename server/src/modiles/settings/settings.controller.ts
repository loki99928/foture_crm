import {Controller, Delete, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

@Controller('/settings')
@ApiTags('settings')
export class SettingsController {
}
