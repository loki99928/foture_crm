import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {ImagesService} from "./images.service";
import {join} from "path";

@Controller('images')
export class ImagesController {
    constructor(
        private readonly ImagesService: ImagesService
    ) {}
}
