import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('own_settings')
export class SettingsEntity extends BaseEntity{

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number

    @Column({
        type: 'character',
        length: 50,
        name: 'option'
    })
    public name: string

    @Column({
        type: 'character',
        length: 20,
        name: 'value'
    })
    public value: string

    async toResponseObject(showToken: boolean = true) {
        const {id, name, value} = this
        const responseObject: any = {id, name, value}

        return responseObject
    }
}