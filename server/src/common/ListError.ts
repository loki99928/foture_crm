import {HttpStatus} from "@nestjs/common";
export let error: { [key:string]: { error: string; status: HttpStatus } } = {
    QueryFailedError: {
        status: HttpStatus.BAD_REQUEST,
        error: 'User creation error'
    },
    MailException: {
        status: HttpStatus.FORBIDDEN,
        error: 'Mail sending error'
    }
}