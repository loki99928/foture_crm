import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {ImagesService} from "./images.service";
import {join} from "path";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('images')
@Controller('images')
export class ImagesController {
    constructor(
        private readonly ImagesService: ImagesService
    ) {}
}
