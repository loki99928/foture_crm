import {HttpException, HttpStatus} from "@nestjs/common";

export class MailException extends HttpException {
    constructor() {
        super('Mail sending error', HttpStatus.UNPROCESSABLE_ENTITY);
    }
}