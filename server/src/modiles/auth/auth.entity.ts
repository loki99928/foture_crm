import {BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import * as bcrypt from "bcrypt";

@Entity({name: 'own_temporary_user'})
export class TemporaryUser extends BaseEntity{
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

    @Column()
    hashUser: string

    @Column({
        default: 0
    })
    attemptsNumber: number

    @BeforeInsert()
    async setPassword(password: string){
        const salt = bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, await salt)
    }
}