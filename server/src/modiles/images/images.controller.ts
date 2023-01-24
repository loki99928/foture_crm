import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {ImagesService} from "./images.service";

@Controller('images')
export class ImagesController {
    constructor(
        private readonly ImagesService: ImagesService
    ) {}

    @Get('/:filename')
    get(@Param("filename") filename: string){
        console.log(filename)
        return 'filename'
        // res.sendFile(name, { root: 'static/images'});
        // return this.ImagesService.uploadImage(name)
    }
}
