import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('own_settings')
export class SettingsEntity extends BaseEntity{

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number

    @Column({
        name: 'option'
    })
    public option: string

    @Column({
        name: 'value'
    })
    public value: string
}