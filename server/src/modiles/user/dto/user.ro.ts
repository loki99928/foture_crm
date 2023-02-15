import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserRO {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    accessToken: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    avatarUrl: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    role: string
}
