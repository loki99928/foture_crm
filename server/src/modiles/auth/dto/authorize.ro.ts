import {ApiProperty} from "@nestjs/swagger";

export class MessageRO {
    @ApiProperty()
    message:string[];
}