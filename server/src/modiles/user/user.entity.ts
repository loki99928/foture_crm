import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from "bcrypt";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";

@Entity({name:'own_user'})
export class UserEntity extends BaseEntity{
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

    @Column({
        default: undefined
    })
    hashUser: string

    /**
     * number of password reset requests
     */
    @Column({
        default: 0
    })
    attemptsNumber: number

    /**
     * number of password reset requests
     */
    @Column({
        default: false
    })
    confirm: boolean

    /**
     * Half-day password change request time
     */
    @Column({
        default: null
    })
    lastModifiedTime: Date

    @BeforeInsert()
    async setHashUser(){
        this.hashUser = getAlphaNumericRandom(20)
    }

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(password: string){
        const salt = bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, await salt)
        return this.password
    }

}
