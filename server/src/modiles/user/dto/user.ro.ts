import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserRO {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    role: string

    @IsString()
    @ApiProperty()
    login?: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    avatarUrl?: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    accessToken?: string
}
