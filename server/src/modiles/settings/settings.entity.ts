import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity('own_settings')
export class SettingsEntity extends BaseEntity{

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    @ApiProperty()
    public id: number

    @Column({
        type: 'character',
        length: 50,
        name: 'option'
    })
    @ApiProperty()
    public name: string

    @Column({
        type: 'character',
        length: 20,
        name: 'value'
    })
    @ApiProperty()
    public value: string

    async toResponseObject(showToken: boolean = true) {
        const {id, name, value} = this
        const responseObject: any = {id, name, value}

        return responseObject
    }
}