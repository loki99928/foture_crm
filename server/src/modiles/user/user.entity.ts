import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'own_user'})
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string
}
